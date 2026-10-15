const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const { preserveVersions } = require('./preserve-assets.cjs');
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'veic-asset-tests-'));
const generator = path.join(__dirname, 'version-assets.cjs');
const history = [];
const snapshots = [];
function run(root, check = false) {
  return spawnSync(process.execPath, [generator, '--root', root, ...(check ? ['--check'] : [])], { encoding: 'utf8' });
}
function valid(root) {
  const result = run(root, true);
  assert.equal(result.status, 0, result.stderr);
}
function rejected(root, message) {
  const result = run(root, true);
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, message);
}
for (let i = 0; i < 3; i++) {
  const root = path.join(base, `publication-${i + 1}`);
  fs.mkdirSync(root);
  const sources = { 'script.js': `const version = ${i ? 2 : 1};\r\n`, 'styles.css': `body { color: ${i === 2 ? 'blue' : 'black'}; }\r\n` };
  fs.writeFileSync(path.join(root, 'index.html'), '<link href="styles.css" rel="stylesheet"><script src="script.js"></script>');
  for (const [source, content] of Object.entries(sources)) {
    fs.writeFileSync(path.join(root, source), content);
    history.push({ source, bytes: Buffer.from(content) });
  }
  assert.equal(run(root).status, 0);
  preserveVersions(root, history);
  preserveVersions(root, history, true);
  valid(root);
  snapshots.push(root);
  console.log(`PASS publication ${i + 1}`);
}
const final = snapshots[2];
const assets = root => fs.readdirSync(root).filter(name => /\.[a-f0-9]{16}\./.test(name));
for (const name of assets(snapshots[0])) {
  assert.deepEqual(fs.readFileSync(path.join(final, name)), fs.readFileSync(path.join(snapshots[0], name)));
}
assert.equal(assets(final).length, 4);
console.log('PASS first publication assets survive third publication');
const htmlFile = path.join(final, 'index.html');
const html = fs.readFileSync(htmlFile);
fs.copyFileSync(path.join(snapshots[0], 'index.html'), htmlFile);
rejected(final, /Stale HTML/);
fs.writeFileSync(htmlFile, html);
console.log('PASS stale references rejected');
const current = html.toString().match(/src="([^"]+)"/)[1];
const currentPath = path.join(final, current);
const bytes = fs.readFileSync(currentPath);
fs.unlinkSync(currentPath);
rejected(final, /Missing/);
fs.writeFileSync(currentPath, bytes);
const old = assets(snapshots[0]).find(name => name.startsWith('script.'));
const oldPath = path.join(final, old);
const oldBytes = fs.readFileSync(oldPath);
fs.unlinkSync(oldPath);
assert.throws(() => preserveVersions(final, history, true), /Missing historical/);
fs.writeFileSync(oldPath, 'corrupted');
rejected(final, /hash mismatch/);
assert.throws(() => preserveVersions(final, history), /Historical asset mismatch/);
fs.writeFileSync(oldPath, oldBytes);
console.log('PASS missing current/historical assets and incompatible hashes rejected');
const before = fs.readdirSync(final).map(name => [name, fs.readFileSync(path.join(final, name)).toString('hex')]);
assert.equal(run(final).status, 0);
preserveVersions(final, history);
assert.deepEqual(fs.readdirSync(final).map(name => [name, fs.readFileSync(path.join(final, name)).toString('hex')]), before);
const normalized = history.map(v => ({ ...v, bytes: Buffer.from(v.bytes.toString().replace(/\r\n/g, '\n')) }));
assert.deepEqual(preserveVersions(final, normalized), preserveVersions(final, history));
valid(final);
console.log('PASS idempotence and CRLF/LF equivalence');
// Exercise the actual repository packager, including tracked secondary pages and SEO.
const artifact = path.join(base, 'actual-site');
execFileSync(process.execPath, [path.join(__dirname, 'prepare-pages.cjs'), artifact], { stdio: 'inherit' });
const repo = path.resolve(__dirname, '..');
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: repo, encoding: 'utf8' }).split('\0').filter(Boolean);
for (const name of tracked.filter(name => (name.endsWith('.html') && name !== 'index.html') || ['robots.txt', 'sitemap.xml', 'CNAME'].includes(name))) {
  if (/^(lp-corretor-imoveis|_local-drafts\/|assets\/demo-landing-pages\/)/.test(name)) continue;
  assert.deepEqual(fs.readFileSync(path.join(artifact, name)), fs.readFileSync(path.join(repo, name)), name);
}
console.log('PASS tracked secondary pages, SEO and CNAME preserved byte-for-byte');
console.log(`Test artifacts: ${base}`);

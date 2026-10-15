const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const args = process.argv.slice(2);
let root = path.resolve(__dirname, '..');
let check = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--check') check = true;
  else if (args[i] === '--root' && args[i + 1]) root = path.resolve(args[++i]);
  else throw new Error('Usage: node tools/version-assets.cjs [--check] [--root directory]');
}
const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
let updated = html;
const assets = [
  { source: 'script.js', pattern: /(<script\b[^>]*\bsrc=")script(?:\.[a-f0-9]{16})?\.js(?:\?[^"<>]*)?("[^>]*>)/g },
  { source: 'styles.css', pattern: /(<link\b[^>]*\bhref=")styles(?:\.[a-f0-9]{16})?\.css(?:\?[^"<>]*)?("[^>]*>)/g },
].map(({ source, pattern }) => {
  const bytes = Buffer.from(fs.readFileSync(path.join(root, source), 'utf8').replace(/\r\n/g, '\n'));
  const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16);
  const ext = path.extname(source);
  const filename = `${path.basename(source, ext)}.${hash}${ext}`;
  const matches = [...html.matchAll(pattern)];
  if (matches.length !== 1) throw new Error(`Expected exactly one reference to ${source}`);
  updated = updated.replace(pattern, `$1${filename}$2`);
  return { source, filename, bytes };
});

// Keep old versions: cached HTML must still be able to load its original assets.
for (const { source, filename, bytes } of assets) {
  const target = path.join(root, filename);
  if (fs.existsSync(target)) {
    if (!fs.readFileSync(target).equals(bytes)) {
      throw new Error(`Content mismatch in immutable asset: ${filename}`);
    }
  } else if (check) {
    throw new Error(`Missing ${filename}. Run node tools/version-assets.cjs`);
  } else {
    fs.writeFileSync(target, bytes, { flag: 'wx' });
  }
  console.log(`${source} -> ${filename}`);
}

if (check && html !== updated) {
  throw new Error('Stale HTML references. Run node tools/version-assets.cjs');
}
// Validate old copies as well: a cached page may still request any of them.
if (check) {
  for (const filename of fs.readdirSync(root)) {
    const match = filename.match(/^(?:script|styles)\.([a-f0-9]{16})\.(?:js|css)$/);
    if (!match) continue;
    const actual = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, filename))).digest('hex').slice(0, 16);
    if (actual !== match[1]) throw new Error(`Asset hash mismatch: ${filename}`);
  }
}
if (!check && html !== updated) fs.writeFileSync(htmlPath, updated);
console.log(check ? 'Asset versions verified.' : 'Assets prepared. HTML and generated files are ready for the same artifact.');

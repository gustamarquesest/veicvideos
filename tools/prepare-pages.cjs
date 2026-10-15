const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { readHistory, preserveVersions } = require('./preserve-assets.cjs');

const root = path.resolve(__dirname, '..');
const destination = process.argv[2];
if (!destination) throw new Error('Usage: node tools/prepare-pages.cjs output-directory');
const output = path.resolve(destination);
if (fs.existsSync(output)) throw new Error('Output directory must not already exist.');
const history = readHistory(root);

const versioner = path.join(__dirname, 'version-assets.cjs');
execFileSync(process.execPath, [versioner], { stdio: 'inherit' });
execFileSync(process.execPath, [versioner, '--check'], { stdio: 'inherit' });

// Publish tracked site files only, plus the two assets generated in this build.
const files = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0').filter(Boolean).filter(file => {
    const parts = file.split('/');
    return !parts.some(part => part.startsWith('.'))
      && !/^(tools\/|PUBLICACAO\.md$|_local-drafts\/|lp-corretor-imoveis|assets\/demo-landing-pages\/)/.test(file)
      && !/\.rar$/i.test(file);
  });
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const source of ['script', 'styles']) {
  const match = html.match(new RegExp(`(?:src|href)="(${source}\\.[a-f0-9]{16}\\.(?:js|css))"`));
  if (!match) throw new Error(`Missing versioned ${source} reference`);
  files.push(match[1]);
}
fs.mkdirSync(output, { recursive: true });
for (const file of new Set(files)) {
  const from = path.join(root, file);
  if (!fs.lstatSync(from).isFile()) throw new Error(`Expected regular file: ${file}`);
  const to = path.join(output, file);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}
preserveVersions(output, history);
preserveVersions(output, history, true);
execFileSync(process.execPath, [versioner, '--check', '--root', output], { stdio: 'inherit' });
function totalSize(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).reduce((total, entry) => {
    const file = path.join(directory, entry.name);
    return total + (entry.isDirectory() ? totalSize(file) : fs.statSync(file).size);
  }, 0);
}
const size = totalSize(output);
// Fail rather than prune assets that cached HTML may still need.
if (size > 900 * 1024 * 1024) throw new Error('Artifact exceeds the 900 MiB safety limit. Do not delete historical assets; review storage before publishing.');
console.log(`Artifact size: ${size} bytes`);
console.log(`Pages artifact verified: ${output}`);

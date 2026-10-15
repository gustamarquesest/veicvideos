const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');

function readHistory(root) {
  const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: 32 * 1024 * 1024 });
  if (git('rev-parse', '--is-shallow-repository').toString().trim() !== 'false') {
    throw new Error('Full Git history is required to preserve published assets.');
  }
  const versions = [];
  for (const source of ['script.js', 'styles.css']) {
    const objects = git('rev-list', '--objects', '--full-history', 'HEAD', '--', source)
      .toString().trim().split('\n');
    for (const entry of objects) {
      const separator = entry.indexOf(' ');
      if (separator < 0 || entry.slice(separator + 1) !== source) continue;
      versions.push({ source, bytes: git('cat-file', 'blob', entry.slice(0, separator)) });
    }
  }
  return versions;
}

function preserveVersions(output, versions, check = false) {
  const names = new Set();
  for (const version of versions) {
    const bytes = Buffer.from(version.bytes.toString('utf8').replace(/\r\n/g, '\n'));
    const hash = crypto.createHash('sha256').update(bytes).digest('hex').slice(0, 16);
    const ext = path.extname(version.source);
    const name = `${path.basename(version.source, ext)}.${hash}${ext}`;
    const file = path.join(output, name);
    if (fs.existsSync(file)) {
      if (!fs.readFileSync(file).equals(bytes)) throw new Error(`Historical asset mismatch: ${name}`);
    } else if (check) {
      throw new Error(`Missing historical asset: ${name}`);
    } else {
      fs.writeFileSync(file, bytes, { flag: 'wx' });
    }
    names.add(name);
  }
  return [...names];
}

if (require.main === module) {
  const args = process.argv.slice(2);
  const check = args[0] === '--check';
  const destination = args[check ? 1 : 0];
  if (!destination || args.length !== (check ? 2 : 1)) {
    throw new Error('Usage: node tools/preserve-assets.cjs [--check] output-directory');
  }
  const names = preserveVersions(path.resolve(destination), readHistory(path.resolve(__dirname, '..')), check);
  console.log(`${names.length} historical assets ${check ? 'verified' : 'preserved'}.`);
}

module.exports = { readHistory, preserveVersions };

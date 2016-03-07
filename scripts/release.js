#!/usr/bin/env node

const exec = require('child_process').execSync;
const argv = require('yargs').argv;

const versionType = argv.major ? 'major' : (argv.minor ? 'minor' : 'patch');

function run(cmd, log) {
  log = log === undefined ? true : log;
  const res = exec(cmd).toString();
  if (log && res) console.log(res);
  return res;
}

run('npm install');
run('npm prune');

const VERSION = run('npm --no-git-tag-version version ' + versionType, false);

// run('npm run lint');
run('npm run build');
// run('npm test');
// run('npm run clog');

run('git add -A');
run('git add dist -f');
run('git commit -m "chore: ' + VERSION + '"');
run('git tag ' + VERSION);
run('git push origin master');
run('git push --tags');

run('npm publish');

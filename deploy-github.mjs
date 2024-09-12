#!/usr/bin/env node
// deploy the site to GitHub

import { execFileSync } from 'child_process';
import fs from 'fs';

function run(command, ...args) {
  execFileSync(command, args, { stdio: 'inherit' });
}

function getOutput(command, ...args) {
  return execFileSync(command, args, { stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8' });
}

const distDir = 'dist';
const targetURL = 'https://github.com/inflmts/inflmts.github.io';
const targetBranch = 'gh-pages';

const version = getOutput('git', 'describe', '--always', '--dirty').trim();
const commitMessage = `Update to ${version}`;

process.chdir(distDir);
fs.closeSync(fs.openSync('.nojekyll', 'w'));
fs.rmSync('.git', { force: true, recursive: true });
run('git', 'init', '-b', targetBranch, '.');
run('git', 'add', '.');
run('git', 'commit', '-m', commitMessage);
run('git', 'push', '--force', targetURL, targetBranch);

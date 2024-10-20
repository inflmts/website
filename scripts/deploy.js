#!/usr/bin/env node
// deploy the site to GitHub

import { execFileSync } from 'child_process';
import fs from 'fs';

function run(command, ...args) {
  execFileSync(command, args, { stdio: 'inherit' });
}

const distDir = 'dist';
const targetURL = 'https://github.com/inflmts/inflmts.github.io';
const targetBranch = 'gh-pages';
const commitMessage = 'Update website';
const cname = 'inflmts.com';

process.chdir(distDir);
fs.writeFileSync('.nojekyll', Buffer.alloc(0));
fs.writeFileSync('CNAME', cname);
fs.rmSync('.git', { force: true, recursive: true });
run('git', 'init', '-b', targetBranch, '.');
run('git', 'add', '.');
run('git', 'commit', '-m', commitMessage);
run('git', 'push', '--force', targetURL, targetBranch);

#!/usr/bin/env node
// deploy the site to GitHub

import fs from 'fs';
import { execFileSync } from 'child_process';
import { join } from 'path';

function execCommand(command, args) {
  execFileSync(command, args, { stdio: 'inherit' });
}

const repoURL = 'https://github.com/inflmts/inflmts.github.io';

const version = execFileSync('git', ['describe', '--always', '--dirty'], {
  stdio: ['ignore', 'pipe', 'inherit'],
  encoding: 'utf8'
});

const commitMessage = `Update to ${version}`;

process.chdir('dist');

// create .nojekyll
fs.closeSync(fs.openSync('.nojekyll', 'w'));

fs.rmSync('.git', { force: true, recursive: true });
execCommand('git', ['init', '-b', 'main', '.']);
execCommand('git', ['add', '.']);
execCommand('git', ['commit', '-m', commitMessage]);
execCommand('git', ['push', '--force', repoURL, 'main']);

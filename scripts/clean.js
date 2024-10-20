#!/usr/bin/env node
// clean build files

import fs from 'fs';

fs.rmSync('build', { recursive: true, force: true });
fs.rmSync('dist', { recursive: true, force: true });

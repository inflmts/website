#!/usr/bin/env node
//
// Generates the triangle-grid tile image.
//
// Dependencies:
//   - imagemagick
//

const { execFileSync } = require('child_process');

const outputFile = 'tile.png';

const lines = [
  0,    0,    1,    -1/3,
  0,    1/3,  1,    0,
  0,    2/3,  1,    1/3,
  0,    1,    1,    2/3,
  0,    4/3,  1,    1,

  -1/5, 1,    0,    0,
  0,    1,    1/5,  0,
  1/5,  1,    2/5,  0,
  2/5,  1,    3/5,  0,
  3/5,  1,    4/5,  0,
  4/5,  1,    1,    0,
  1,    1,    6/5,  0,

  0,    1/2,  1/4,  1,
  0,    0,    2/4,  1,
  1/4,  0,    3/4,  1,
  2/4,  0,    1,    1,
  3/4,  0,    1,    1/2
];

const lineCommands = [];
for (let i = 0; i < lines.length; ) {
  const x1 = 92 * lines[i++];
  const y1 = 53 * lines[i++];
  const x2 = 92 * lines[i++];
  const y2 = 53 * lines[i++];
  lineCommands.push(`line ${x1} ${y1} ${x2} ${y2}`);
}

const args = [
  '-size', '92x53', 'canvas:transparent',
  '-stroke', 'white', '-strokewidth', '1',
  '-draw', lineCommands.join(' '),
  '-channel', 'A', '-evaluate', 'multiply', '0.25',
  outputFile
];

execFileSync('magick', args, { stdio: 'inherit' });

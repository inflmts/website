#!/usr/bin/env node

import fs from 'fs';

// See https://stackoverflow.com/a/47593316
function xoshiro128(a, b, c, d) {
  return function() {
    let t = b << 9, r = b * 5;
    r = (r << 7 | r >>> 25) * 9;
    c ^= a;
    d ^= b;
    b ^= c;
    a ^= d;
    c ^= t;
    d = d << 11 | d >>> 21;
    return (r >>> 0) / 4294967296;
  }
}

const ALT = Math.sqrt(3) / 2;

const ROWS = 6;
const COLS = 8;

const random = xoshiro128(0xd0ff4ed5, 0xd147293c, 0x9d3c1c7c, 0x9181601a);

const coords = new Array(2 * (ROWS + 1) * (COLS + 1));
for (let i = 0, r = 0; r <= ROWS; r++) {
  for (let c = 0; c <= COLS; c++) {
    const radius = random() * 0.25;
    const angle = random() * 2 * Math.PI;
    coords[i++] = ((r % 2 ? c : c - 0.5) + radius * Math.cos(angle)).toFixed(3);
    coords[i++] = ((r * ALT) + radius * Math.sin(angle)).toFixed(3);
  }
}

const getX = (r, c) => coords[2 * (r * (COLS + 1) + c)];
const getY = (r, c) => coords[2 * (r * (COLS + 1) + c) + 1];

let content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${COLS - 0.5} ${(ROWS * ALT).toFixed(3)}"><g fill="white">\n`;
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const idx = 2 * (r * (COLS + 1) + c);
    const x1 = coords[idx];
    const y1 = coords[idx + 1];
    const x2 = coords[idx + 2];
    const y2 = coords[idx + 3];
    const x3 = coords[idx + 2 * COLS + 2];
    const y3 = coords[idx + 2 * COLS + 3];
    const x4 = coords[idx + 2 * COLS + 4];
    const y4 = coords[idx + 2 * COLS + 5];
    const points1 = r % 2 ? `${x1} ${y1} ${x3} ${y3} ${x4} ${y4}` : `${x1} ${y1} ${x3} ${y3} ${x2} ${y2}`;
    const points2 = r % 2 ? `${x1} ${y1} ${x4} ${y4} ${x2} ${y2}` : `${x2} ${y2} ${x3} ${y3} ${x4} ${y4}`;
    const opacity1 = (random() * 0.16).toFixed(3);
    const opacity2 = (random() * 0.16).toFixed(3);
    content += `<polygon opacity="${opacity1}" points="${points1}" />\n`;
    content += `<polygon opacity="${opacity2}" points="${points2}" />\n`;
  }
}
content += `</g></svg>\n`;

fs.writeFileSync('pattern.svg', content);

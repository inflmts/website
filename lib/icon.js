import fs from 'fs';
import { dirname } from 'path';
import ico from 'ico-endec';
import sharp from 'sharp';

const mtime = (file) => fs.statSync(file).mtimeMs;

function newer(a, b) {
  let at, bt;
  at = mtime(a);
  try {
    bt = mtime(b);
  } catch (e) {
    if (e.code === 'ENOENT')
      return true;
    throw e;
  }
  return at > bt;
}

const sourceFile = 'icon.svg';
const destFile = 'build/icon.ico';
const sizes = [16, 32, 48, 256];

export async function generateIcon() {
  // This is loosely based on the svg-to-ico package:
  // https://github.com/jtrauntvein/svg-to-ico

  fs.mkdirSync(dirname(destFile), { recursive: true });

  const source = fs.readFileSync(sourceFile);
  const svg = sharp(source);

  // generate png images for each size
  const buffers = await Promise.all(sizes.map((size) =>
    svg
      .clone()
      .resize(size, size, { background: { r: 0, g: 0, b: 0, alpha: 0 }})
      .png({ compressionLevel: 0 })
      .toBuffer()
  ));

  // combine the images into the ico file
  const icoBuffer = ico.encode(buffers);
  fs.writeFileSync(destFile, icoBuffer);
}

//
// This is a plugin for generating the site icon.
//
// During dev, when the browser requests the icon, this plugin checks to see if
// the icon file doesn't exist or is older than the source svg file, and if so,
// rebuilds the icon. During build, the icon is built unconditionally.
//
export default function icon() {

  let command;
  let logger;

  return {
    name: 'icon',
    configResolved(config) {
      command = config.command;
      logger = config.logger;
    },
    configureServer(server) {
      server.middlewares.use('/' + destFile, (req, res, next) => {
        if (newer(sourceFile, destFile)) {
          logger.info(`Generating icon...`);
          generateIcon().then(next);
        } else {
          next();
        }
      });
    },
    buildStart() {
      if (command === 'build') {
        logger.info(`Generating icon...`);
        return generateIcon();
      }
    }
  };

}

import fs from 'fs';
import ico from 'ico-endec';
import sharp from 'sharp';

async function mtime(file) {
  try {
    return (await fs.promises.stat(file)).mtimeMs;
  } catch (e) {
    if (e.code !== 'ENOENT')
      throw e;
    return 0;
  }
}

async function newer(a, b) {
  const at = await mtime(a);
  const bt = await mtime(b);
  return at > bt;
}

// This plugin generates the site favicon.
export default function favicon() {

  const sourceFile = 'favicon.svg';
  const destFile = 'build/favicon.ico';
  const sizes = [16, 24, 32, 48, 64, 128, 192, 256];
  let logger;
  let command;

  async function build() {
    logger.info(`Generating favicon...`);

    await fs.promises.mkdir('build', { recursive: true });

    const svg = await fs.promises.readFile(sourceFile);

    // generate png images for each size
    const buffers = await Promise.all(sizes.map((size) =>
      sharp(svg)
        .resize(size, size, { background: { r: 0, g: 0, b: 0, alpha: 0 }})
        .png({ compressionLevel: 0 })
        .toBuffer()
    ));

    // combine the images into the ico file
    const icoBuffer = await ico.encode(buffers);
    await fs.promises.writeFile(destFile, icoBuffer);
  }

  return {
    name: 'favicon',
    configResolved(config) {
      logger = config.logger;
      command = config.command;
    },
    configureServer(server) {
      let promise = null;
      const reset = () => { promise = null; };
      server.middlewares.use('/' + destFile, (req, res, next) => {
        if (!promise) {
          promise = newer(sourceFile, destFile).then((result) => {
            if (result)
              return build();
          });
          promise.finally(reset);
        }
        promise.then(next);
      });
    },
    async buildStart() {
      if (command === 'build')
        await build();
    }
  };

}


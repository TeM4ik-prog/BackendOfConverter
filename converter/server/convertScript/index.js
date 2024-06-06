
let fs = require("fs");
// const { execa } = require('execa');
let zlib = require('zlib');
let render = require('./render.js');
let os = require("os")
let { createBrowser, removeDirectory, saveScreenshots, streamToString, bufferToStream } = require('./utils.js');

const isWindows = ['win32', 'win64'].includes(os.platform());


console.log('start')
const normalizeOptions = function (animationData, options) {
  if (!options.width || !options.height) {
    const { w = 512, h = 512 } = animationData;
    const aR = w / h;

    if (options.width) {
      options.height = options.width / aR;
    } else if (options.height) {
      options.width = options.height * aR;
    } else {
      options.width = w;
      options.height = h;
    }
  }

  options.width = options.width | 0;
  options.height = options.height | 0;

  return options;
};

const fromStream = function (converter) {
  return async (sticker, outputPath, options = {}) => {
    console.log(sticker)

    const inputStream = bufferToStream(sticker.buffer);
    // console.log(inputStream)

    // const lottieString = await streamToString(inputStream.pipe(zlib.createGunzip()));
    // const lottieString = await streamToString(sticker.buffer)
    // await streamToString(inputStream.pipe(zlib.createGunzip()));

    const lottieString = await streamToString(inputStream.pipe(zlib.createGunzip()));

    console.log(streamToString)


    let browser = options.browser;
    let isBrowserCreated = false;
    if (!browser) {
      browser = await createBrowser();
      isBrowserCreated = true;
    }

    const animationData = JSON.parse(lottieString);
    const result = await converter(animationData, outputPath, normalizeOptions(animationData, { browser, ...options }));
    if (isBrowserCreated) {
      await browser.close();
    }
    return result;
  }
};

const fromFile = function (converterFromStream) {
  return (sticker, outputPath, options) => {
    return converterFromStream(sticker.buffer, outputPath, options);
  };
};

const toGif = fromStream(async function (animationData, outputPath, options = {}) {
  const { execa } = await import('execa');

  options.quality = options.quality || 80;
  options.fps = options.fps || Math.min(animationData.fr, 50); // most viewers do not support gifs with FPS > 50

  const { dir, files, pattern } = await saveScreenshots(await render(options.browser, animationData, options));

  try {
    await execa(
      process.env.GIFSKI_PATH || 'gifski',
      [
        '-o', outputPath,
        '--fps', options.fps,
        '--quality', options.quality,
        '--height', options.height,
        '--width', options.width,
        '--quiet',
        ...(isWindows ? [pattern] : files),
      ]);
  } catch (e) {
    throw e;
  } finally {
    // await removeDirectory(dir);
  }
});
const toGifFromFile = fromFile(toGif);

// for capability with previous version
const convertFile = async function (inputPath, options = {}) {
  return toGifFromFile(inputPath, options.output || inputPath + '.gif', options);
};


// const toWebP = fromStream(async function (animationData, outputPath, options = {}) {
//   options.fps = options.fps || animationData.fr;

//   const { dir, files, pattern } = await saveScreenshots(await render(options.browser, animationData, options));

//   try {
//     await execa(
//       process.env.IMG2WEBP_PATH || 'img2webp',
//       [
//         '-lossy',
//         '-d', Math.round(1000 / options.fps),
//         ...(isWindows ? [pattern] : files),
//         '-o', outputPath,
//       ]);
//   } catch (e) {
//     throw e;
//   } finally {
//     await removeDirectory(dir);
//   }
// });
// const toWebpFromFile = fromFile(toWebP);


module.exports = {
  toGif,
  toGifFromFile,
  convertFile
}
// export const toWebpFromFile = fromFile(toWebP);

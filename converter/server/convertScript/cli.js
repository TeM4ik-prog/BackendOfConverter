let fs = require('fs');
let path = require('path');
let { ArgumentParser } = require('argparse');
const { createBrowser } = require('./utils');
const { toGifFromFile } = require('.');


const convertFiles = async function (ar_strickers, browser, options) {
  console.log(ar_strickers)
  let ar_paths = []
  for (const sticker of ar_strickers) {
    console.log(`Converting ${sticker.originalname}...`);

    try {
      await toGifFromFile(sticker, `./public/stickers/${path.parse(sticker.originalname).name}.gif`, options);

      ar_paths.push({ url: `/stickers/${path.parse(sticker.originalname).name}.gif`, confirmed: false })
    } catch (e) {
      console.error(e);
    }
  }

  console.log("converted")

  return ar_paths
};

async function Main(ar_strickers) {
  console.log(ar_strickers)
  const parser = new ArgumentParser({
    description: 'Animated stickers for Telegram (*.tgs) to animated GIFs converter',
  });
  parser.add_argument('--height', { help: 'Output image height. Default: auto', type: Number });
  parser.add_argument('--width', { help: 'Output image width. Default: auto', type: Number });
  parser.add_argument('--fps', { help: 'Output frame rate. Default: auto', type: Number });
  parser.add_argument('paths', { help: 'Paths to .tgs files to convert', nargs: '+' });

  // const args = parser.parse_args();

  // console.log(args)

  // const paths = args.paths;
  // for (let i = 0; i < paths.length; ++i) {
  //   let filePath = paths[i];
  //   if (fs.lstatSync(filePath).isDirectory()) {
  //     for (const subFilePath of fs.readdirSync(filePath)) {
  //       if (path.extname(subFilePath) === '.tgs') {
  //         paths.push(path.join(filePath, subFilePath));
  //       }
  //     }
  //     paths.splice(i--, 1);
  //   }
  // }


  // console.log(paths)

  const browser = await createBrowser();
  let ar_paths = await convertFiles(ar_strickers, browser);
  await browser.close();


  return ar_paths
};


module.exports = {
  Main
}

// main();

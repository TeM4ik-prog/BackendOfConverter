// import { readdirSync } from 'fs';
// import { join } from 'path';
// import { toGifFromFile, toWebpFromFile } from '../index.js';
// import { createTemporaryDirectory, removeDirectory } from '../utils.js';

let fs = require("fs")

let { toGifFromFile } = require("..");
const { createTemporaryDirectory, removeDirectory } = require("../utils");

let { join } = require('path');

// readdirSync

// toGifFromFile

const formatMap = {
    gif: toGifFromFile,
    webp: toWebpFromFile,
};

const stickerFiles = readdirSync(join('tests', 'stickers')).filter(x => x.endsWith('.tgs'));

for (const stickerFile of stickerFiles) {
    describe(stickerFile, function () {
        for (const [format, formatFunc] of Object.entries(formatMap)) {
            test(format, async function () {
                const temporaryDirectory = await createTemporaryDirectory();
                await formatFunc(fs.join('tests', 'stickers', stickerFile), join(temporaryDirectory, `output.${format}`));
                await removeDirectory(temporaryDirectory);
            });
        }
    });
}

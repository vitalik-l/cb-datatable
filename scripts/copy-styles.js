import path from 'path';
import fse from 'fs-extra';

const SRC_DIR = './src';
const finder = require('findit')(SRC_DIR);

// copy img and fonts folder
finder.on('directory', function (dir, stat, stop) {
  const dirname = path.parse(dir).name;
  if (dirname === 'img' || dirname === 'fonts') {
    const buildPath = dir.replace('src', 'lib').replace('\\src', '');
    fse
      .copy(dir, buildPath)
      .then(() => console.log(`Copied ${dir} to ${buildPath}`))
      .catch((err) => console.error(err));
    stop();
  }
});

// copy scss files
finder.on('file', function (file) {
  const fileParams = path.parse(file);
  const { dir, ext } = fileParams;
  if (ext === '.scss' || ext === '.css') {
    const isStoryStyle = dir.indexOf('\\story') !== -1;
    if (!isStoryStyle) {
      const buildPath = file.replace('src', 'lib').replace('\\src', '');
      fse
        .copy(file, buildPath)
        .then(() => console.log(`Copied ${dir} to ${buildPath}`))
        .catch((err) => console.error(err));
    }
  }
});

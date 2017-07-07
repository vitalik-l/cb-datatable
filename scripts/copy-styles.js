import path from 'path';
import fse from 'fs-extra';
const SRC_DIR = './src';
var finder = require('findit')(SRC_DIR);

finder.on('directory', function (dir, stat, stop) {
    const dirname = path.parse(dir).name;
    if (dirname === 'styles' || dirname === 'img') {
        const buildPath = dir.replace('src', 'lib');
        fse.copy(dir, buildPath)
            .then(() => console.log(`Copied ${dir} to ${buildPath}`))
            .catch(err => console.error(err));
        stop();
    }
});



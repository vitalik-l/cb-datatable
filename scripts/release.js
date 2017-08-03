var shell = require('shelljs');
var publishUtils = require('./utils');
var path = require('path');
var packageJson = require(path.resolve('./package.json'));

const TAG_NAME = 'v' + packageJson.version;

// git commit
try {
  publishUtils.exec('git add .');
  publishUtils.exec('git commit -m "release ' + TAG_NAME + '"');
  publishUtils.exec('git push origin master');
} catch(err) {}

// set version tag to latest commit
publishUtils.exec('git tag -f ' + TAG_NAME);
// pushing tag
console.log('=> Pushing tag');
publishUtils.exec('git push origin ' + TAG_NAME);

console.log('=> Publish');
publishUtils.exec('yarn build && npm publish --tag next');

var platform = process.argv[2].replace('--', '');
var packager = require('electron-packager');
var package = require('../package.json');
var path = require('path');

var opts = {
  dir: '.',
  name: package.productName,
  platform: platform,
  arch: 'all',
  version: package.electronVersion,
  asar: false,
  'app-version': package.version,
  ignore: 'node_modules|resources|bin|scripts',
  out: 'bin'
};

if (platform == 'win32') {
  opts.icon = path.join(__dirname, '..', 'resources', 'chrome.ico');
} else {
  opts.icon = path.join(__dirname, '..', 'resources', 'chrome.icns');
}

packager(opts, function(err, path) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('App created at ' + path);
});
var platform = process.argv[2].replace('--', '');
var packager = require('electron-packager');
var package = require('../package.json');

var opts = {
  dir: '.',
  name: package.productName,
  platform: platform,
  arch: 'all',
  version: package.electronVersion,
  asar: false,
  'app-version': package.version,
  ignore: 'node_modules',
  out: 'bin'
};

packager(opts, function(err, path) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('App created at ' + path);
});
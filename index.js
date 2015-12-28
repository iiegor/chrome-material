(() => {
  const package = require('./package.json');
  
  function init() {
    process.versions.app = package.version;
    
    // Bind essential browser events
    // FIXME: This throws an exception sometimes
    /*BrowserWindow.on('blur', function() {
      document.body.classList.add('blur');
    })

    BrowserWindow.on('focus', function() {
      document.body.classList.remove('blur');
    })*/
  }

  init();
})();
(() => {
  const remote = require('electron').remote;
  const BrowserWindow = remote.getCurrentWindow();
  
  function init() {
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
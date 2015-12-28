'use strict';

(() => {
  const remote = require('electron').remote;
  const BrowserWindow = remote.getCurrentWindow();

  Polymer({
    is: 'browser-topbar',

    handleExit() {
      remote.app.quit();
    },

    handleMaximize() {
      if (!BrowserWindow.isMaximized()) {
        BrowserWindow.maximize();
      } else {
        BrowserWindow.restore();
      }
    },

    handleMinimize() {
      BrowserWindow.minimize();
    }
  });
})();
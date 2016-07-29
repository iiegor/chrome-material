'use strict';

(() => {
  const remote = require('electron').remote;
  const BrowserWindow = remote.getCurrentWindow();

  Polymer({
    is: 'browser-topbar',

    properties: {
      showIcons: {
        value: !(process.platform === 'darwin')
      }
    },

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

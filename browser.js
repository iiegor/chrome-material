'use strict';

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const globalShortcut = electron.globalShortcut; // Module to register global keyboard shortcuts.
const path = require('path'); // Provide system path utilities

let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  const protocol = electron.protocol; // Module to register custom protocols or incercept existing ones.

  // Register internal:// protocol
  protocol.registerFileProtocol('internal', function(request, callback) {
    let relativePath = path.normalize(request.url.substr(11));
    
    callback(path.join(__dirname, 'internal', relativePath));
  }, function(error) {
    if (error)
      console.error('Failed to register protocol')
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 500,
    minHeight: 200,
    frame: false
  });

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Expose DevTools on dev mode
  if (process.argv.indexOf('--dev') !== -1) {
    globalShortcut.register('ctrl+shift+j', function() {
      mainWindow.webContents.openDevTools();
    });
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
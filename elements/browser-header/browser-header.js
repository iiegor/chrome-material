'use strict';

(() => {
  const url = require('url');
  const remote = require('electron').remote;
  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;

  Polymer({
    is: 'browser-header',

    handleRefresh() {
      console.debug('Refresh event fired');

      // NOTE: Maybe there is a better way?
      document.querySelector('browser-content::shadow div.iron-selected > #view').reload();
    },

    handleFavorite(e) {
      let el = e.target;

      el.classList.toggle('marked');
    },

    // TODO: Fix animation being blocked when menu appears.
    handleMore(e) {
      let offsetLeft = e.currentTarget.offsetLeft - 55;
      let offsetTop = e.currentTarget.offsetTop + e.currentTarget.clientHeight + 25;

      let menu = new Menu();
      menu.append(new MenuItem({
        label: 'New tab',
        accelerator: 'CmdOrCtrl+T',
        click: function() {
          document.querySelector('browser-content').handleNewTab();
        }
      }));
      menu.append(new MenuItem({
        label: 'New window',
        accelerator: 'CmdOrCtrl+N',
        click: function() {
          // TODO: Create a new instance of the browser
        }
      }));
      menu.append(new MenuItem({
        label: 'Settings',
        click: function() {
          document.querySelector('browser-content').handleNewTab('Settings', 'internal://pages/settings.html');
        }
      }));
      menu.append(new MenuItem({type: 'separator'}));
      menu.append(new MenuItem({label: 'Exit', accelerator: 'CmdOrCtrl+Shift+Q'}));

      menu.popup(remote.getCurrentWindow(), offsetLeft, offsetTop);
    },

    handleNavigate(e) {
      if (e.keyCode !== 13) {
        return;
      }

      let location = url.parse(e.target.value);

      if (!location.protocol) {
        location.protocol = 'http:';
        location.hostname = location.host = location.href;
        location.href = `${location.protocol}//${location.href}/`;
        location.path = '/';
        location.pathname = '/';
      }

      document.querySelector('browser-content').navigateTo(location.format());
    }
  });
})();

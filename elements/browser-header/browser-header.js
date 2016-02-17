'use strict';

(() => {
  const url = require('url');
  const remote = require('electron').remote;
  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;

  var menu = new Menu();
  menu.append(new MenuItem({ label: 'Settings', click: function() { console.log('item 1 clicked'); } }));
  menu.append(new MenuItem({ type: 'separator' }));
  menu.append(new MenuItem({ label: 'Exit' }));

  Polymer({
    is: 'browser-header',

    handleRefresh() {
      console.debug('Refresh event fired');

      // NOTE: Maybe there is a better way?
      document.querySelector('browser-content::shadow div.iron-selected > #view').reload();
    },

    handleFavorite(e) {
      let el = e.target;

      if (el.classList.contains('marked')) {
        el.classList.remove('marked');
      } else {
        el.classList.add('marked');
      }
    },

    handleMore(e) {
      menu.popup(remote.getCurrentWindow(), e.currentTarget.offsetLeft - 55, e.currentTarget.offsetTop + e.currentTarget.clientHeight + 25);
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

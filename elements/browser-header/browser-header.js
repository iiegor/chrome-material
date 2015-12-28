'use strict';

(() => {
  const url = require('url');

  Polymer({
    is: 'browser-header',

    handleRefresh(e) {
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

    handleNavigate(e) {
      if (e.keyCode !== 13)
        return;

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
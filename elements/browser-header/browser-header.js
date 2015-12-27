'use strict';

(() => {
  Polymer({
    is: 'browser-header',

    handleRefresh(e) {
      console.debug('Refresh event fired');

      // NOTE: Maybe there is a better way?
      document.querySelector('browser-content::shadow #view').reload();
    },

    handleFavorite(e) {
      let el = e.target;

      if (el.classList.contains('marked')) {
        el.classList.remove('marked');
      } else {
        el.classList.add('marked');
      }
    }
  });
})();
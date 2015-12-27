(() => {
  Polymer({
    is: 'browser-header',

    handleRefresh(e) {
      console.debug('Refresh event fired');

      // NOTE: Maybe there is a better way?
      document.querySelector('browser-content::shadow #view').reload();
    }
  });
})();
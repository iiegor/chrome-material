(() => {
  Polymer({
    is: 'browser-content',

    ready() {
      // Correct the useragent
      this.$.view.setAttribute('useragent', navigator.userAgent.replace('Chrome/0.0.1 ', ''))

      this._bindViewEvents();
    },

    navigateTo(url) {
      this.$.view.setAttribute('src', url);
    },

    _bindViewEvents() {
      this.$.view.addEventListener('dom-ready', function() {
        console.log('view dom ready')
      });

      this.$.view.addEventListener('page-title-updated', function(a) {
        document.title = a.title;
      });
    }
  });
})();
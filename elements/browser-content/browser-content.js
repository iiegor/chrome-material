(() => {
  Polymer({
    is: 'browser-content',

    ready() {
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
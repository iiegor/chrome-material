(() => {
  Polymer({
    is: 'browser-content',

    properties: {
      isLoading: {
        type: Boolean,
        notify: false,
        readOnly: false,
        value: false
      } 
    },

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

      /**
       * Loading events
       */
      this.$.view.addEventListener('did-start-loading', (a) => {
        console.debug('Started loading...');

        this.isLoading = true;
      });

      this.$.view.addEventListener('did-stop-loading', function(a) {
        console.debug('Stop loading');
      });

      this.$.view.addEventListener('did-finish-load', (a) => {
        console.debug('Finish load');

        this.isLoading = false;
      });

      this.$.view.addEventListener('did-fail-load', (e) => {
        // TODO: Catch the rest of error codes :P
        switch (e.errorCode) {
          // ERR_NAME_NOT_RESOLVED
          case -105:
            this.$.view.setAttribute('src', 'file://' + __dirname + '/internal/error/index.html')
            break;
        }
      });
    }
  });
})();
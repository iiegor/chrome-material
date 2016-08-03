'use strict';

(() => {
  Polymer({
    is: 'browser-content',

    properties: {
      tabs: {
        type: Array,
        value: [],
        notify: true
      },

      activeTab: {
        type: Number,
        notify: true
      }
    },

    ready() {
      // TODO: Restore last session opened tabs (and create an option to disable that)
      this.createTab('Google', 'http://google.com');
    },

    createTab(title, href) {
      let tab = {
        title: title,
        location: href,
        favicon: '',
        userAgent: navigator.userAgent.replace(`${process.app.name}/${process.app.version} `, '')
      };

      this.push('tabs', tab);

      // set as selected and bind view events
      this._setSelected(this.tabs.length - 1);
      setImmediate(this._bindView.bind(this));
    },

    _setSelected(index) {
      setImmediate(() => {
        this.$.tabs.select(index);
      });

      this.$.tabs.notifyResize();
    },

    navigateTo(url) {
      this.currentView.setAttribute('src', url);
    },

    handleNewTab() {
      this.createTab('New tab', 'https://google.com');
    },

    handleClose(e) {
      if (this.tabs.length === 1) {
        document.querySelector('browser-topbar::shadow .button.close').click();
        return;
      }

      let index = e.model.index;

      // remove tab and select the previous tab
      this.splice('tabs', index, 1);
      this._setSelected(index);
    },

    _bindView() {
      this.currentView.addEventListener('did-start-loading', () => {
        this.set(`tabs.${this.activeTab}.isLoading`, true);
      });

      this.currentView.addEventListener('did-stop-loading', () => {
        this.set(`tabs.${this.activeTab}.isLoading`, false);
      });

      this.currentView.addEventListener('did-fail-load', e => {
        // TODO: Catch the rest of error codes :P
        switch (e.errorCode) {
          // ERR_NAME_NOT_RESOLVED
          case -105:
            this.currentView.setAttribute('src', 'internal://pages/error.html');
            break;
        }
      });

      this.currentView.addEventListener('page-title-updated', e => {
        this.set(`tabs.${this.activeTab}.title`, e.title);

        document.title = e.title;

        // Fire tab resize event
        this.$.tabs.notifyResize();
      });

      this.currentView.addEventListener('page-favicon-updated', e => {
        this.set(`tabs.${this.activeTab}.favicon`, e.favicons[0]);
      });

      this.currentView.addEventListener('enter-html-full-screen', () => {
        document.body.classList.add('fullscreen');
      });

      this.currentView.addEventListener('leave-html-full-screen', () => {
        document.body.classList.remove('fullscreen');
      });
    },

    get currentView() {
      return this.$$('div.iron-selected > #view');
    },

    get currentTab() {
      return this.tabs[this.activeTab];
    }
  });
})();

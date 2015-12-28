'use strict';

(() => {
  const path = require('path');

  Polymer({
    is: 'browser-content',

    properties: {
      tabs: {
        type: Array,
        notify: true
      },

      activeTab: {
        type: Number,
        notify: true
      }
    },

    ready() {
      this.tabs = [this._createTab('Google', 'http://google.com')];
      this._setSelected(0);
    },

    _createTab(title, href) {
      let tab = {
        title: title,
        location: href,
        favicon: '',
        userAgent: navigator.userAgent.replace(`Chrome/${process.versions.app} `, '')
      };

      return tab
    },

    _setSelected(index) {
      setImmediate(() => {
        this.$.tabs.select(index);
      });
    },

    navigateTo(url) {
      this.currentView.setAttribute('src', url);
    },

    handleNewTab() {
      let tab = this._createTab('New tab', 'internal://pages/newtab.html');

      this.push('tabs', tab);

      // set as selected
      this._setSelected(this.tabs.length - 1);
    },

    handleClose(e) {
      if (this.tabs.length === 1) {
        document.querySelector('browser-topbar::shadow iron-icon[icon="cancel"]').click();
        return;
      }

      let index = e.model.index;

      console.debug(`Closing tab with index ${index}`);
      this.splice('tabs', index, 1);

      this._setSelected(index - 1);
    },

    get currentView() {
      return this.$$('div.iron-selected > #view');
    }
  });
})();
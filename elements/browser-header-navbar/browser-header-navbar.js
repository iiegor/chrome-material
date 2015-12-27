'use strict';

(() => {
  Polymer({
    is: 'browser-header-navbar',

    properties: {
      tabs: {
        type: Object,
        notify: true,
        readOnly: false
      },

      activeTab: {
        type: Number,
        notify: true,
        readOnly: false
      }
    },

    ready() {
      this.tabs = [
        this.createPage('Google', 'https://google.com')
      ]
    },

    createPage(title, href) {
      return {
        title: title,
        location: href
      }
    },

    handleClose(e) {
      let index = e.model.index;

      console.debug(`Closing tab with index ${index}`);
      this.splice('tabs', index, 1);
    },

    handleNewTab() {
      this.push('tabs', this.createPage('Github', 'https://github.com'))

      // set as selected
      this.$.tabs.selected = this.tabs.length - 1
    }
  });
})();
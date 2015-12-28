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

      activeTabIndex: {
        type: Number,
        notify: true,
        readOnly: false,
        value: 0
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
        location: href,
        favicon: ''
      }
    },

    // FIXME: Selected tab is lost when closing other 
    handleClose(e) {
      let index = e.model.index;

      console.debug(`Closing tab with index ${index}`);
      this.splice('tabs', index, 1);
    },

    handleNewTab() {
      this.push('tabs', this.createPage('Github', 'https://github.com'))

      // set as selected
      this.$.tabs.selected = this.tabs.length - 1;
    },

    handleFaviconUpdate(favicons) {
      let favicon = favicons[0];

      console.debug(`Updating favicon to ${favicon}`)
      this.set(`tabs.${this.activeTabIndex}.favicon`, favicon)
    }
  });
})();
/**
 * Anantomy Doc section component
 *
 * @region fileDetailsRegion [region where the anatomy doc page is shown]
 */
Mast.define('DocsSection_anatomy', function() {

  return {

    // Will be used to complete the template name
    root: 'myApp/',
    extension: '.html',

    // This will be responsibe for updating the docs content and showing the tree correctly.
    '%changeContent': function(path) {
      this.attachContent(path);
    },

    events: {
      'click .folder': 'expandFolder',
      'click .file': 'showContent'
    },

    afterRender: function () {

      // Slice the window hash string to get the page name we want to attach, then attach it
      var hash = window.location.hash;

      // Just return if we are at '#!documentation'. This will render the default route specified
      // in the DocumetationPage template
      if (hash === '#!documentation/anatomy') {
        this.fileDetailsRegion.attach('myApp.html');
      } else {
        var sections = hash.split('anatomy/');

        // The full root of the the path, this is the template name also.
        this.attachContent(_.last(sections));
        this.updateTree(_.last(sections));
      }
    },

    expandFolder: function(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      this.$(e.currentTarget).toggleClass('expanded');
      this.showContent(e);
    },

    showContent: function(e) {
      e.stopPropagation();
      e.stopImmediatePropagation();

      var $target = $(e.currentTarget);

      var content = this.$(e.currentTarget).attr('data-page');
      this.attachContent(content);

      // change the location manually.
      window.location.hash = '#!documentation/anatomy/' + content;
    },

    // Highlight the section that has the new stuff.
    highlightSidebarSection: function(content) {
      this.$('.file-list .active').removeClass('active');
      this.$('.file-list [data-page="' + content +'"]').addClass('active');
    },

    attachContent: function(content) {
      var fullPath = this.root + content + this.extension;
      this.fileDetailsRegion.attach(fullPath);
      this.highlightSidebarSection(content);
    },

    /**
     * Updates the sidebar tree for the project.
     */
    updateTree: function(content) {
      var self = this;
      var sections = content.split('/');
      var path = '';

      // loop will expand all the folders that are in this path.
      _.each(sections, function(section, i) {

        // For the first item, we dont add a slash, but we do for the others.
        if (i === 0)
          path += section;
        else
          path += '/' + section;

        self.$('[data-page="' + path + '"]').addClass('expanded');
      });
    }

  };

});

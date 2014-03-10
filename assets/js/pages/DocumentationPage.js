/**
 * Old documentation page
 * (guides..?)
 *
 * @region embeddedSection
 */
Mast.define('DocumentationPage', function() {

  return {

    afterRender: function() {
      // Slice the window hash string to get the page name we want to attach, then attach it
      var hash = window.location.hash;

      // Just return if we are at '#!documentation'. This will render the default route specified
      // in the DocumetationPage template
      if (hash === '#!documentation') {
        return;
      } else {
        var sections = hash.split('/');
        var page = sections[sections.length - 1]
        this.embeddedSection.attach(page);
      }

      Mast.trigger('link:selected', page);
    },

    beforeClose: function(cb) {
      Mast.off('link:selected');
      cb();
    }
  };
});

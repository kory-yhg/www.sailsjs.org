/**
 *
 * @region contentRegion
 */
Mast.define('DocsSection', function() {

  return {

    afterRender: function() {
      this.highlightSectionLink();
    },

    /**
     * High lights the current sections link.
     */
    highlightSectionLink: function() {
      var hash = window.location.hash;

      // The section data is always after the forst `/` character.
      var section = hash.split('/')[1];

      // Select the list item and change the header text.
      var $selectedSection = this.$('[data-section="' + section + '"] li')
      $selectedSection.addClass('selected');
      this.$('.header-title').text($selectedSection.text());

      //Change the title when it's on version Notes
      if (this.$('.header-title').text() === "") {
        this.$('.header-title').text("Version Notes");
      };

      //Give Anatomy the full title
      if (this.$('.header-title').text() === "Anatomy") {
        this.$('.header-title').text("Anatomy of a Sails App");
      };
    }
	};

});

Mast.define('Subnavigation', function() {
  return {

    className: 'sidebar documentation-sidebar',

    afterRender: function () {

      Mast.on('link:selected', function (page) {
        this.$('.nav-item').removeClass('selected');

        // If contains substring 'config' then bold the config thing.
        if (page.indexOf('config') !== -1) {
            this.$('.nav-item[href*="configuration"]').addClass('selected');            
        } else {
            this.$('.nav-item[href*="' + page + '"]').addClass('selected');
        }

      })
    }
  };
})

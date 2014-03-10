Mast.define('Topbar', function () {
  return {



    // Main desktop site

    afterRender: function () {
      this.renderNav();
    },

    afterChange: {
      currentPage: function () {
        this.renderNav();
      }
    },

    // Events
    // 'click .nav a': 'selectLink',

    // Mark which item in the nav is current
    renderNav: function () {
      var pageName = this.model.get('currentTab');
      var $allNavItems = this.$('a.sails-site');
      var $navItem = this.$('a[data-page="' + pageName + '"]');
      $allNavItems.removeClass('current');
      $navItem.addClass('current');
    },

    // Select the link that is clicked
    selectLink: function (e) {
      var $itemClicked = $(e.currentTarget);
      var pageToNavigateTo = $itemClicked.attr('data-page');
      this.model.set({currentTab: pageToNavigateTo});
      // this.$('a').removeClass('current');
      // $(e.currentTarget).addClass('current');
    },



    // Click events
    'click .menu'        : 'toggleMobileMenu',
    'click .docs-menu'   : 'toggleMobileDocsMenu',
    'click .nav a.sails-site': function (e) {
        e.preventDefault();
        this.selectMenuItem(e);
    },


    // Navigate to clicked/touched menu hash
    selectMenuItem: function (e) {
      e.preventDefault();
      var hash = $(e.currentTarget).attr('href');
      this.$el.removeClass('menu-open');
      window.location.hash = hash;
    },

    // Find the menu item whose href matches the current hash url
    // highlightActiveMenuItem: function () {
    //   var currentHash = document.location.hash || '#';
    //   this.$('.dropdown-nav a li').removeClass('selected');
    //   this.$('.dropdown-nav a[href="' + currentHash + '"] li').addClass('selected');
    // },

    // Show or hide the mobile nav menu
    toggleMobileMenu: function (e) {
      var self = this;
      $(document).off('click');

      // check for class `menu-open` on this.$el.
      // if it has the class, remove the click handler for clickoutside
      if (this.$el.hasClass('menu-open')) {
        this.$el.removeClass('menu-open');
      }

      // if it doesnt, set up click handler for clickoutside.
      else {
        this.$el.addClass('menu-open');
        window.setTimeout(function() {
          $(document).on('click', function(e) {
            self.$el.removeClass('menu-open');
          });
        }, 0);
      }
    }
  };
});

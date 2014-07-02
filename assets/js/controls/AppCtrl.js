angular.module('Sails').controller('AppCtrl', [
  '$scope',
  '$window',
  '$timeout',
  'Menu',
  '$location',
  '$anchorScroll',
  function($scope, $window, $timeout, Menu, $location, $anchorScroll) {

    MENU = Menu;

    // Houses the state for the documentation pages.
    // Should never be reset (only its properties changed)
    $scope.docs = {};

    // Qualifiers
    $scope.getIsCurrentPage = function(path) {
      var current = window.location.hash;
      return current === '#' + path;
    };

    /**
     * Skrollr.js handling
     * Runs on load and on route change success
    */
    $scope.$on('$locationChangeSuccess', function(event) {
      // Init skrollr if wider than mobile layout
      if ($window.innerWidth >= 768) {
        // Move to end of digest, allows ng-include to finish
        $timeout(function() {
          // If there's already an instance of skroller in the scope, destroy it
          if ($scope.s) {
            $scope.s.destroy();
          }
          // Init skroller
          $scope.s = skrollr.init({
            forceHeight: false
          });

          // Init skrollr hash menu plugin
          //skrollr.menu.init($scope.s);

        }, 1000); // In the past, this timeout was causing issues with the nav not loading
      }
    });
    $scope.scrollToTopOfPage = function(thenDownBy) {

      // Compensate for the fixed topbar
      var topBarHeight = Number($('.topbar').height());
      if (thenDownBy) {
        $('body').scrollTop(thenDownBy - topBarHeight - 20);
      } else {
        $('body').scrollTop(-(topBarHeight + 20));
      }

    };
    $scope.scrollTo = function(anchor) {
      var old = $location.hash();

      // console.log('Scrolling to', anchor)
      $location.hash(anchor);
      $anchorScroll();
      $location.hash(old);

      $scope.scrollToTopOfPage($('body').scrollTop());
    };

    $scope.intent = angular.extend($scope.intent || {}, {


      /**
       * goto()
       *
       * Navigate to the specified client-side route.
       *
       * @param  {String} hash (e.g. #/foo/bar, #/blah)
       */
      goto: function(hash) {
        window.location.hash = hash;
        $scope.scrollToTopOfPage();
      },
      toggleMenuItem: function(id) {
        var $menuItem = $scope.docs.findMenuItemByID(id, $scope.docs.visibleMenu.concat($scope.docs.subMenus));

        if ($menuItem && $menuItem.expanded) {
          $scope.intent.collapseMenuItem(id);
        } else {
          $scope.intent.expandMenuItem(id);
        }
      },

      expandMenuItem: function(id) {
        var globalMenu = Menu.all($scope.docs.sectionID);

        // Find the targeted menu item in the visible menu and expand it
        var $menuItem = $scope.docs.findMenuItemByID(id, $scope.docs.visibleMenu.concat($scope.docs.subMenus));

        $menuItem.expanded = true;
        $menuItem.visibleChildren = _.where(globalMenu, {
          parent: $menuItem.id
        });

        // add
        $menuItem.visibleChildren = _.unique($menuItem.visibleChildren.concat(_.where(globalMenu, {
          parent: id
        })));
      },

      collapseMenuItem: function(id) {
        var $menuItem = _.find($scope.docs.visibleMenu.concat($scope.docs.subMenus), {
          id: id
        });

        if (!$menuItem) {
          return;
        }
        $menuItem.expanded = false;
        $menuItem.visibleChildren = [];
      }
    });
  }
]);

angular.module('Sails').controller('AppCtrl', [
  '$scope',
  'Menu',

  function($scope, Menu) {

    MENU = Menu;

    // Houses the state for the documentation pages.
    // Should never be reset (only its properties changed)
    $scope.docs = {};


    // Qualifiers
    $scope.getIsCurrentPage = function(path) {
      var current = window.location.hash;
      return current === '#' + path;
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
      },

      toggleMenuItem: function(id) {
        var $menuItem = $scope.docs.findMenuItemByID(id, $scope.docs.visibleMenu);

        if ($menuItem.expanded) {
          $scope.intent.collapseMenuItem(id);
        } else {
          $scope.intent.expandMenuItem(id);
        }
      },

      expandMenuItem: function(id) {
        var globalMenu = Menu.all($scope.docs.sectionID);

        // Find the targeted menu item in the visible menu and expand it
        var $menuItem = $scope.docs.findMenuItemByID(id, $scope.docs.visibleMenu);
        console.log($scope.docs.visibleMenu.length, $scope.docs.visibleMenu);

        if (!$menuItem) {
          if (typeof console !== 'undefined') console.error('couldn\'t expand because couldnt find (' + id + ')');
          return;
        }

        $menuItem.expanded = true;
        $menuItem.visibleChildren = _.where(globalMenu, {
          father: $menuItem.id
        });
      },

      collapseMenuItem: function(id) {
        var $menuItem = _.find($scope.docs.visibleMenu, {
          id: id
        });
        if (!$menuItem) {
          if (typeof console !== 'undefined') console.error('couldn\'t collapse because couldnt find (' + id + ')');
          return;
        }
        $menuItem.expanded = false;
        $menuItem.visibleChildren = [];
      }
    });
  }
]);

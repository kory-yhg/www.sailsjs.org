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

    // Fires on load and on route change success
    // Likely moving all of this to skrollr.directive
    $scope.$on('$locationChangeSuccess', function(event) {
      // Wait on ngInclude (temporary solution, need to implement ngInclude onLoad())
      setTimeout(function(){
        if($scope.skrollr){
          $scope.skrollr.destroy();
        }
        // Add skrollr to $scope
        $scope.skrollr = skrollr.get();
        // Refresh all skroller elements
        // $scope.skrollr.refresh();  IM TIRED OF THIS ERROR!!!!
      }, 150);
    });

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
        var $menuItem = $scope.docs.findMenuItemByID(id, $scope.docs.visibleMenu.concat($scope.docs.subMenus));

        if ($menuItem.expanded) {
          $scope.intent.collapseMenuItem(id);
        } else {
          $scope.intent.expandMenuItem(id);
        }
      },

      expandMenuItem: function(id,withoutThese) {

        // TODO: remove the 'non-subsection children' when a sub-section is selected 
        var removeUncles = withoutThese||[];

        var globalMenu = Menu.all($scope.docs.sectionID);
        // Find the targeted menu item in the visible menu and expand it
        var $menuItem = $scope.docs.findMenuItemByID(id, $scope.docs.visibleMenu.concat($scope.docs.subMenus));
        // console.log($scope.docs.visibleMenu.length, $scope.docs.visibleMenu);

        if (!$menuItem) {
          // if (typeof console !== 'undefined')
          console.log('couldn\'t expand because couldnt find (' + id + ')');
          return;
        }
console.log('menuItem:',$menuItem)
        $menuItem.expanded = true;
        $menuItem.visibleChildren = _.where(globalMenu, {
          parent: $menuItem.id
        });

        // $menuItem.visibleChildren = _.unique($menuItem.visibleChildren.concat(_.where(globalMenu, function(thisItem){
        //   if (thisItem.parent === id && removeUncles.indexOf(id) < 0)
        //     return thisItem
        //   // parent: id
        // })));
        $menuItem.visibleChildren = _.unique($menuItem.visibleChildren.concat(_.where(globalMenu, {
          parent: id
        })));

        console.log('Found these subItems:',$menuItem.visibleChildren)

      },

      collapseMenuItem: function(id) {
        var $menuItem = _.find($scope.docs.visibleMenu, {
          id: id
        });
        if (!$menuItem) {
          if (typeof console !== 'undefined') console.log('couldn\'t collapse because couldnt find (' + id + ')');
          return;
        }
        $menuItem.expanded = false;
        $menuItem.visibleChildren = [];
      }
    });
  }
]);

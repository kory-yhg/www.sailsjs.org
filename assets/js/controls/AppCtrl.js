angular.module('Sails').controller('AppCtrl', [
  '$scope',
  'Menu',

  function($scope, Menu) {

    // Houses the state for the documentation pages.
    // Should never be reset (only its properties changed)
    $scope.docs = {};

    // var referenceMenuData = flattenJST('reference', JST);
    // var referenceMenuOrphans = _.where(referenceMenuData, {parentName: null});
    // $scope.referenceMenu = referenceMenuOrphans;
    // MENU=referenceMenuData;

    // var anatomyMenuData = flattenJST('anatomy', JST);
    // var anatomyMenuOrphans = _.where(anatomyMenuData, {parentName: null});
    // $scope.anatomyMenu = anatomyMenuOrphans;

    // $scope.docs.menu


    // Qualifiers
    $scope.getIsCurrentPage = function( path ) {
      var current = window.location.hash;
      return current === '#'+path;
    };

    $scope.intent = angular.extend($scope.intent || {}, {

      /**
       * goto()
       *
       * Navigate to the specified client-side route.
       *
       * @param  {String} hash (e.g. #/foo/bar, #/blah)
       */
      goto: function (hash) {
        window.location.hash = hash;
      },

      toggleMenuItem: function (id) {
        var $menuItem = $scope.docs.findMenuItemByID(id,$scope.docs.visibleMenu);

        if ($menuItem.expanded) {
          $scope.intent.collapseMenuItem(id);
        }
        else {
          $scope.intent.expandMenuItem(id);
        }
      },

      expandMenuItem: function (id) {
        var globalMenu = Menu.all($scope.docs.sectionID);

        // Find the targeted menu item in the visible menu and expand it
        var $menuItem = $scope.docs.findMenuItemByID(id,$scope.docs.visibleMenu);

        if (!$menuItem){
          if (typeof console !== 'undefined') console.error('couldn\'t expand because couldnt find ('+id+')');
          return;
        }

        $menuItem.expanded = true;
        $menuItem.visibleChildren = _.where(globalMenu,{ parentName: $menuItem.name });
      },

      collapseMenuItem: function (id) {
        var $menuItem =_.find($scope.docs.visibleMenu, {name:id});
        if (!$menuItem){
          if (typeof console !== 'undefined') console.error('couldn\'t collapse because couldnt find ('+id+')');
          return;
        }
        $menuItem.expanded = false;
        $menuItem.visibleChildren = [];
      },

      // showTemplateForReferenceItem: function (id) {
      //   var thisMenuItem = _.findWhere(referenceMenuData, { name: id });
      //   var overviewTemplate = _.findWhere(referenceMenuData, { name: id+'.html' });

      //   if (thisMenuItem.templatePath) {
      //     $scope.currentPage = thisMenuItem;
      //   } else if(overviewTemplate) {
      //     $scope.currentPage = overviewTemplate;
      //   }
      // },
      // toggleReferenceItemExpanded: function (id) {
      //   var thisMenuItem = _.findWhere(referenceMenuData, { name: id });

      //   if (!thisMenuItem.expanded) {
      //     $scope.intent.expandMenuItem(referenceMenuData, id);
      //   }
      //   else {
      //     $scope.intent.collapseMenuItem(referenceMenuData,id);
      //   }
      // },
      // showTemplateForAnatomyItem: function (id) {
      //   var thisMenuItem = _.findWhere(anatomyMenuData, { name: id });
      //   var overviewTemplate = _.findWhere(anatomyMenuData, { name: id+'.html' });

      //   if (thisMenuItem.templatePath) {
      //     $scope.currentPage = thisMenuItem;
      //   } else if(overviewTemplate) {
      //     $scope.currentPage = overviewTemplate;
      //   }
      // },
      // toggleAnatomyItemExpanded: function (id) {
      //   var thisMenuItem = _.findWhere(anatomyMenuData, { name: id });

      //   if (!thisMenuItem.expanded) {
      //     $scope.intent.expandMenuItem(anatomyMenuData, id);
      //   }
      //   else {
      //     $scope.intent.collapseMenuItem(anatomyMenuData,id);
      //   }
      // }
    });
  }
]);

/**
 * Configure client-side routes (#/foo, #/bar, etc.)
 */

angular.module('Sails')
.config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/', {
      templateUrl: 'templates/pages/HomePage.html'
    })

    .when('/getStarted', {
      templateUrl: 'templates/pages/GetStartedPage.html'
    })

    .when('/logos', {
      templateUrl: 'templates/pages/LogosPage.html'
    })

    .when('/features', {
      templateUrl: 'templates/pages/FeaturesPage.html'
    })

    //Documentation Sections:
    .when('/documentation', {
      templateUrl: 'templates/pages/Documentation/DocsMainPage.html'
    })

    //Version Notes Links
    .when('/documentation/changelog/pre-0.8.77', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_before0.8.77.html'
    })
    .when('/documentation/changelog/0.8.7x', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.8.7x.html'
    })
    .when('/documentation/changelog/0.8.8x', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.8.8x.html'
    })
    .when('/documentation/changelog/0.8.9', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.8.9.html'
    })
    .when('/documentation/changelog/0.9.0', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.0.html'
    })
    .when('/documentation/changelog/0.9.4', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.4.html'
    })
    .when('/documentation/changelog/0.9.7', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.7.html'
    })
    .when('/documentation/changelog/0.9.16', {
      templateUrl: 'templates/pages/Documentation/VersionNotes/Changelog_0.9.8.html'
    })

    .when('/documentation/anatomy', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      redirectTo: '/documentation/anatomy/myApp'
    })

    .when('/documentation/reference', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      redirectTo: '/documentation/reference/Assets'
    })

    // Documentation section sub-router
    .when('/documentation/:sectionPath*?', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      controller: ['$scope', '$routeParams', 'Menu', function ($scope, $routeParams, Menu) {
        // Split sectionPath on slashes, lower-case each piece, and eliminate empty pieces
        // to determine the top-level docs section (e.g. "reference")
        // and to determine the "id" of the subpage to display (e.g. "Blueprints")
//        var pieces = !$routeParams.sectionPath ? [] : _($routeParams.sectionPath.split('/'))
        var pieces = $routeParams.sectionPath.split('/');
        // .where(function eliminateEmptypieces(piece) { return !!piece; }).valueOf();
        // Get topLevelSectionID (e.g. "anatomy", "reference")
        var topLevelSectionID = pieces[0];
        $scope.docs.sectionID = topLevelSectionID;

        // Build the menu
        var menu = Menu.all(topLevelSectionID);

        // Expose top-level menu in scope 
        // Show only the menus that are parents but not children
        $scope.docs.visibleMenu = _.where(menu, function(anItem){
          if (anItem.isParent && !anItem.isChild){
            // console.log('making',anItem.id,'visible')
            return anItem
          }
        });
        $scope.docs.subMenus = _.where(menu, {isParent: true, isChild: true});


        $scope.docs.findMenuItemByID = function (id, findIn) {
          var grabItem = _.find(findIn,{fullPathAndFileName:id})
          if (grabItem){       
            return grabItem
          } else {
            return {};
          }
        };

        // Then show the top-level docs section (e.g. anatomy, reference)
        $scope.docs.sectionTpl = 'templates/pages/Documentation/sections/DocsSection_'+topLevelSectionID+'.html';
        switch(topLevelSectionID) {
          case 'anatomy':
            $scope.docs.title = 'Anatomy of a Sails App';
            break;
          case 'reference':
            $scope.docs.title = 'Reference';
            break;
        }

        // Trim trailing slash(es)
        var currentHashURL = window.location.hash.replace(/\/+$/,'');

        // Lookup current page
        var target = _.find(menu, function(checkItem){
          if (currentHashURL === checkItem.href)
            return checkItem

        });

        if (!target) target = _.find(menu, {href: currentHashURL});
        if (!target) target = _.find(menu, {label: 'Assets'});

        // Then show the appropriate sub-section
        $scope.docs.subSectionID = target.id;
        $scope.docs.currentPage = target;
        $scope.docs.parentPage = _.find(menu,{id:target.parent});


        // Now collapse all other top-level sections
        _($scope.docs.visibleMenu).where({parent: undefined}).each(function (topLevelItem) {
          $scope.intent.collapseMenuItem(topLevelItem.id);
        });

        // In order to expand the appropriate parts of the menu
        // (expand the current page, and expand its parent, and then its parent, etc.)
        // we must find the menu item's ancestors

        var ancestors = [];
        var findParentsOfThese = [target];

        // Recursively pushes all parents of 'target'
        // to the ancestors array
        var grabParents = function(){

          if (findParentsOfThese.length){

            var navItem = findParentsOfThese.shift();

            if (navItem.parent){
              var parent = $scope.docs.findMenuItemByID(navItem.parent,menu);
              findParentsOfThese.push(parent)
              ancestors.push(parent)

            }

            grabParents();

          } else {

              // Since there are no more ancestors to find,
              // expand all of the ancestors and the current target

              _.each(ancestors,function(ancestor){
                $scope.intent.expandMenuItem(ancestor.id);
              })

              $scope.intent.expandMenuItem(target.id);

              // Close all submenus that arent in lineage 
              _.where($scope.docs.subMenus,function (lilMenu) {
                if (!(_.contains(ancestors, lilMenu) || _.isEqual(lilMenu, target)))
                  $scope.intent.collapseMenuItem(lilMenu.id)
              });
          }

        }

      grabParents();

      }]
    });
}]);

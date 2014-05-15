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
        var pieces = !$routeParams.sectionPath ? [] : _($routeParams.sectionPath.split('/'))
        .where(function eliminateEmptypieces(piece) { return !!piece; }).valueOf();
        // console.log(pieces);


        // Get topLevelSectionID (e.g. "anatomy", "reference")
        var topLevelSectionID = pieces[0];

        // Build the menu
        var menu = Menu.all(topLevelSectionID);

        // Lookup target
        var subSectionID;
        var target;

        // if target is undefined, try to find the next best match, and
        // in the worst case, just do the default behavior.
        // (e.g. the sub-section id is the same as the top-level id, or
        // this is an unrecognized page)
        var tries = 0;
        while (!target && tries<3) {
          subSectionID = pieces.pop();
          console.log('in',topLevelSectionID,', trying '+subSectionID);
          target = _(menu).find(_ifPropertyEqualsCaseInsensitive('name', subSectionID));
          tries++;
          if (typeof subSectionID === 'undefined') break;
        }
        if(!target) {
          // If something weird is received, just show the assets section
          window.location.hash='#/documentation/reference/Assets';
          // TODO: show a landing page
          return;
        }


        // Expose top-level menu in scope (i.e. orphans)
        $scope.docs.visibleMenu = _.where(menu, {parentName: null});

        // Add some methods for accessing the visibleMenu's items
        $scope.docs.findMenuItemByID = function (id, $submenu) {
          // console.log('looking in', _.pluck($submenu, 'name'), 'for ', id);
          return _.find($submenu, function ($menuItem) {
            // console.log('comparing',$menuItem.name,'to',id);
            if ($menuItem.name === id) {
              return $menuItem;
            }
            else return $scope.docs.findMenuItemByID(id, $menuItem.visibleChildren);
          });
        };

        // Then show the top-level docs section (e.g. anatomy, reference)
        $scope.docs.sectionID = topLevelSectionID;
        $scope.docs.sectionTpl = 'templates/pages/Documentation/sections/DocsSection_'+topLevelSectionID+'.html';
        switch(topLevelSectionID) {
          case 'anatomy':
            $scope.docs.title = 'Anatomy of a Sails App';
            break;
          case 'reference':
            $scope.docs.title = 'Reference';
            break;
        }

        // Then show the appropriate sub-section
        $scope.docs.subSectionID = target.name;
        $scope.docs.currentPage = target;

        // Now collapse all other top-level sections
        // (TODO: play w/ this-- is this even a good thing UX-wise?)
        _($scope.docs.visibleMenu).where({parentName: null}).each(function (topLevelItem) {
          $scope.intent.collapseMenuItem(topLevelItem.name);
        });

        // In order to expand the appropriate parts of the menu
        // (expand the current page, and expand its parent, and then its parent, etc.)
        // we must find the menu item's ancestors
        var ancestors = [];
        var parent = _(menu).find(_ifPropertyEqualsCaseInsensitive('name', target.parentName));
        while (parent) {
          ancestors.push(parent);
          parent = _(menu).find(_ifPropertyEqualsCaseInsensitive('name', parent.parentName));
        }

        // Now expand the menu item's ancestors
        while (ancestors.length) {
          var toExpand = ancestors.shift();
          console.log('trying to expand ancestor',toExpand.name);
          $scope.intent.expandMenuItem(toExpand.name);
        }
        // Finally, expand the menu item itself
        console.log('trying to expand',target);
        $scope.intent.expandMenuItem(target.name);

      }]
    });

    // .when('/documentation/anatomy/:sectionPath*?', {
    //   templateUrl: 'templates/pages/Documentation/DocsSection.html',
    //   controller: function ($scope) {
    //     console.log(window.location.hash);
    //     $scope.intent.changeDocsTab('anatomy');
    //   }
    // })
    // .when('/documentation/guides', {
    //   templateUrl: 'templates/pages/Documentation/DocsSection.html',
    //   controller: function ($scope) {
    //     $scope.intent.changeDocsTab('guides');
    //   }
    // })

    // .otherwise({
      // redirectTo: '/'
    // });
  }
]);






function _ifPropertyEqualsCaseInsensitive (property, other) {
  return function (item) {
    return item[property]&&item[property].toLowerCase()===(other && other.toLowerCase());
  };
}

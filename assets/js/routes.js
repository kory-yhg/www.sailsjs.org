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

        var topLevelSectionID = pieces[0];
        var subSectionID = pieces.pop();

        // Build the menu
        var menu = Menu.all(topLevelSectionID);


        // Expose top-level menu in scope (i.e. orphans)
        $scope.docs.menu = _.where(menu, {parentName: null});

        console.log($scope.docs.menu);
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
        var target = _(menu).find(_ifPropertyEqualsCaseInsensitive('name', subSectionID)) || {};
        $scope.docs.subSectionID = target.name;
        $scope.currentPage = target;


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

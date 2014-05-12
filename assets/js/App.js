angular.module('Sails', [
  'ngRoute'
]);

// skrollr.init ({
//   forceHeight: false,
// });

angular.module('Sails')
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/', {
      templateUrl: 'templates/pages/HomePage.html'
    })

    .when('/documentation', {
      templateUrl: 'templates/pages/Documentation/DocsMainPage.html'
    })

    //Documentation Sections:
    .when('/documentation/reference', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      controller: function ($scope) {
        $scope.intent.changeDocsTab('reference');
      }
    })
    .when('/documentation/anatomy', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      controller: function ($scope) {
        $scope.intent.changeDocsTab('anatomy');
      }
    })
    // .when('/documentation/guides', {
    //   templateUrl: 'templates/pages/Documentation/DocsSection.html',
    //   controller: function ($scope) {
    //     $scope.intent.changeDocsTab('guides');
    //   }
    // })

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


    .when('/getStarted', {
      templateUrl: 'templates/pages/GetStartedPage.html'
    })

    .when('/logos', {
      templateUrl: 'templates/pages/LogosPage.html'
    })

    .when('/features', {
      templateUrl: 'templates/pages/FeaturesPage.html'
    })

    .otherwise({
      redirectTo: '/'
    });
  }
]);


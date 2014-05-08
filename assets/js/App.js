angular.module('Sails', [
  'ngRoute'
]);

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
    .when('/documentation/guides', {
      templateUrl: 'templates/pages/Documentation/DocsSection.html',
      controller: function ($scope) {
        $scope.intent.changeDocsTab('guides');
      }
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


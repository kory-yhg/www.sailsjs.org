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
      templateUrl: 'templates/pages/DocumentationPage.html'
    })

    .when('/getStarted', {
      templateUrl: 'templates/pages/GetStartedPage.html'
    })

    .when('/logos', {
      templateUrl: 'templates/pages/LogosPage.html'
    })

    .otherwise({
      redirectTo: '/'
    });
  }
]);


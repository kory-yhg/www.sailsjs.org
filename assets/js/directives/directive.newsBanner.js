angular.module('Sails').directive('newsBanner', ['$http', function ($http) {
  return {
    restrict: 'E',
    templateUrl: '/templates/NewsBanner.html',
    scope: {},
    link: function (scope) {

      // $http.get('/')
      var options = {
        lastUpdateOnGithub: {
          date: new Date(),
          url: 'https://github.com/'+'balderdashy/sails'
        }
      };

      scope.options = options;
    },
  };
}]);

angular.module('Sails').directive('newsBanner', ['$http', function ($http) {
  return {
    restrict: 'E',
    templateUrl: '/templates/NewsBanner.html',
    scope: {},
    link: function (scope) {

      scope.options={};

      $http.get('/news').then(function (res) {
        var repo = res.data;

        scope.options.lastUpdateOnGithub= {
          date: repo.updated_at,
          url: repo.commits_url
        };

      }, function onError(err) {
        scope.options.error = err;
      });

    },
  };
}]);

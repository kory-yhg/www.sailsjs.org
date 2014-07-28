angular.module('Sails').directive('newsBanner', ['getRepoCommits', function (getRepoCommits) {
  return {
    restrict: 'E',
    templateUrl: '/templates/NewsBanner.html',
    scope: {},
    link: function (scope) {


      scope.loading = true;
      getRepoCommits.fn({})
      .then(function (_options) {
        scope.options = _options;
        scope.loading = false;
      })
      .catch(function (err) {
        if (scope && scope.options)
          scope.options.error = true;
      });

    },
  };
}]);

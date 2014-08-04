angular.module('Sails').directive('lastUpdatedBanner', ['getRepoCommits', function (getRepoCommits) {
  return {
    restrict: 'E',
    templateUrl: '/templates/pages/Documentation/Reusable/LastUpdated.html',
    scope: {
      path: '='
    },
    link: function (scope) {
      scope.loading = true;
      getRepoCommits.fn({
        path: scope.path
      })
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

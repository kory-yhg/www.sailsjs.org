angular.module('Sails').directive('lastUpdatedBanner', ['getRepoCommits', function (getRepoCommits) {
  return {
    restrict: 'E',
    templateUrl: '/templates/docPageLastUpdated.html',
    scope: {
      path: '='
    },
    link: function (scope) {
      console.log('PATH:', scope.path);
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

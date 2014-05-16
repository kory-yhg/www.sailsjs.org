angular.module('Sails').directive('newsBanner', ['getRepoCommits', function (getRepoCommits) {
  return {
    restrict: 'E',
    templateUrl: '/templates/NewsBanner.html',
    scope: {},
    link: function (scope) {


      getRepoCommits.fn({
        user: 'balderdashy',
        repo: 'sails'
      })
      .then(function (_options) {
        scope.options = _options;
      }, function (err) {
        scope.options.error = true;
      });

    },
  };
}]);

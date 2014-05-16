angular.module('Sails').directive('newsBanner', function () {
  return {
    restrict: 'E',
    templateUrl: '/templates/NewsBanner.html',
    scope: true,
    link: function (scope) {
      // console.log('ok!');

      var options = {
        lastUpdateOnGithub: {
          date: new Date(),
          url: 'https://github.com/balderdashy/sails'
        }
      };
      scope.options = options;
    },
  };
});

angular.module('Sails').directive('communityBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/templates/directives/social-media-buttons.html',
    scope: true,
    controller: ['$scope', function ($scope) {
      console.log('ok!');
    }],
  };
});

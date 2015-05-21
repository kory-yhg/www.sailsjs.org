/**
 * scrollng
 * ------------------------------------------------------------------------
 * This is a custom directive that tracks your scroll position
 */
angular.module('SailsWebsite')
.directive('scrollng', function () {

  return {
    restrict: 'A',
    scope: true,
    link: function ($scope, el) {

      $(window).scroll(_.throttle(function () {
        $scope.scrollTop = $(document).scrollTop();
        $scope.scrollCtxWidth = $(el).width();
        $scope.$apply();
      }, 50));
    }
  };

});

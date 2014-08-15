/**
 * Click Outside Directive
 * ------------------------------------------------------------------------
 * Handles hiding of shown content when a click occures outside the shown content.
 * Useful for custom dropdown menus.
 */
angular.module('Sails')

.directive('clickOutside', ['$document', '$timeout', function ($document, $timeout) {

  return {
    restrict: 'A',
    scope: {
      isOpen: '='
    },
    link: function ($scope, el, attrs) {

      // Set up click outside behavior.
      $scope.$watch('isOpen', function (newVal) {
        if (newVal) {
          $timeout(function () {
            $document.on('click', function () {
              $scope.isOpen = false;
              $scope.$apply();
            });
          }, 0);
        }
        else {
          $document.off();
        }
      });
    }
  };
}]);

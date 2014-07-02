/**
 * Bubble directive.
 * ------------------------------------------------------------------------
 * This is a custom directive that shows type labels
 *
 * Usage:
 * ```
 * <bubble type="typeOfThing" colors="boolean"></bubble>
 * ```
 */
angular.module('Sails')

.directive('bubble', [function () {

  // actual directive.
  return {
    templateUrl: 'templates/directives/bubble.html',
    restrict: 'E',
    require: 'ngModel',
    scope: {
      type: '@',
      colors: '='
    }
  };

}]);
bubbles.js

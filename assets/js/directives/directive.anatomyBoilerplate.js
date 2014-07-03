/**
 * Anatomy boilerplate directive.
 * ------------------------------------------------------------------------
 * This is a custom directive that indicates its contents will be a code block
 * represnting the boilerplate contents of a file created using the `sails-generate-new`
 * generator.
 *
 * Usage:
 * ```
 * <div www-sjs-anatomy-boilerplate>
 *   <!-- ... contents here ... -->
 * </div>
 * ```
 */
angular.module('Sails')

.directive('wwwSjsAnatomyBoilerplate', [function () {

  // actual directive.
  return {
    restrict: 'A'
  };

}]);

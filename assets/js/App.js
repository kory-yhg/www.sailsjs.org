/**
 * Define the app module ("Sails")
 *
 * Bring any module dependencies (ngRoute, etc.)
 */

(function () {
  var dependencies = [
    'directive.stopPropagation',
    'ngTouch'
  ];

  angular.module('SailsWebsite', dependencies);
})();


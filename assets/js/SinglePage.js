/**
 * Define the app module ("Sails")
 *
 * Bring any module dependencies (ngRoute, etc.)
 */

(function () {
  var dependencies = [
    'ngRoute',
    'directive.stopPropagation',
    'duScroll'
  ];

  angular.module('Sails', dependencies);
})();


/**
 * Define the app module ("Sails")
 *
 * Bring any module dependencies (ngRoute, etc.)
 */

(function () {
  var dependencies = [
    'ngRoute',
    'directive.stopPropagation',
    'duScroll',
    'ngAnimate'
  ];

  angular.module('Sails', dependencies);
})();


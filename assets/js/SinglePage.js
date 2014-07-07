/**
 * Define the app module ("Sails")
 *
 * Bring any module dependencies (ngRoute, etc.)
 */

(function () {
  var dependencies = [
    'ngRoute',
    'directive.stopPropagation',
    'directive.clickOutside',
    'duScroll',
    'ngAnimate'
  ];

  angular.module('Sails', dependencies);
})();


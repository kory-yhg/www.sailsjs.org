/**
 * Define the app module ("Sails")
 *
 * Bring any module dependencies (ngRoute, etc.)
 */

(function () {
  var dependencies = [
    'ngRoute',
    'directive.stopPropagation'
  ];

  // Don't do this crazy parallax business on mobile
  // if (window.innerWidth >= 768) {
  //   dependencies.push('directive.skrollr');
  // }

  angular.module('Sails', dependencies);
})();


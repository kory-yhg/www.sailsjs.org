/**
 * Define the app module ("Sails")
 *
 * Bring any module dependencies (ngRoute, etc.)
 */

(function () {
  var dependencies = [
    'ngRoute',
    'directive.stopPropagation',
    'angularMoment'
  ];

  // Don't do this crazy parallax business on mobile
  if (window.innerWidth >= 768) {
    dependencies.push('directives.skrollr');
  }

  angular.module('Sails', dependencies);
})();


angular.module('Sails').controller('AppCtrl', [
  '$scope',

  function($scope) {
	console.log('hello?');
	$scope.intent = angular.extend($scope.intent || {}, {
		isCurrentPage: function( path ) {
			var current = window.location.hash;
			return current === '#'+path;
		}
	});
  }
]);

angular.module('Sails').controller('AppCtrl', [
  '$scope',

  function($scope) {
	$scope.docs = {};
	$scope.intent = angular.extend($scope.intent || {}, {
		isCurrentPage: function( path ) {
			var current = window.location.hash;
			return current === '#'+path;
		},

		changeDocsTab: function(section) {
			$scope.docs.currentSection = section;
			$scope.docs.documentationSection = 'templates/pages/Documentation/sections/DocsSection_'+section+'.html';

			if(section === 'anatomy') {
				$scope.docs.currentSectionTitle = 'Anatomy of a Sails App';
			}
			if(section === 'reference') {
				$scope.docs.currentSectionTitle = 'Reference';
			}
		}
	});
  }
]);

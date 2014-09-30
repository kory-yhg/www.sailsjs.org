angular.module('Sails').controller('SearchCtrl', [
	'$scope',
	'$window',
	'$location',
	function($scope, $window, $location) {

		$scope.docsSearchResults = [];
		$scope.docsSearchFlashMessage = '';

		$scope.searchTimeout = {
			counting: false,
			id: null
		};

		var queryBackend = function(query){
			console.log('Querying backend for',query);
			updateFlashMessage('Searching docs for '+query);

			$scope.docsSearchResults = [];

			io.socket.post('/search',{searchQuery:query},function(serverResponse){
				console.log('Server replied with',serverResponse.length,'matches');
				$scope.docsSearchResults = serverResponse;
				updateFlashMessage('');
				$scope.$apply();
			});


		}

		var updateFlashMessage = function(newMessage){

			$scope.docsSearchFlashMessage = newMessage;
			$scope.$apply();
		}

		$scope.echo = function(query){
			if (!$scope.searchTimeout.counting){
				$scope.searchTimeout.id = window.setTimeout(function(){
					queryBackend(query);
				},3000);
				$scope.searchTimeout.counting = true
			} else {
				$scope.searchTimeout.id = window.clearTimeout($scope.searchTimeout.id);
				$scope.searchTimeout.id = window.setTimeout(function(){
					queryBackend(query);
				},3000);


			}


			return true;
		};

		// $scope.search.sectionTemplate = './templates/pages/search/searchDefault.html';

		$scope.intent = angular.extend($scope.intent || {}, {
			// loadSubSection: function(templateName) {
			//   $scope.search.sectionTemplate = './templates/pages/search/' + templateName + '.html';
			// }
		});

	}
]);

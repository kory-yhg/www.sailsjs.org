angular.module('Sails').controller('SupportCtrl', [
  '$scope',
  '$window',
  '$location',
  function($scope, $window, $location) {
  	console.log('SupportCtrl HITTING!')
    // Houses the state for the support pages.
    // Should never be reset (only its properties changed)
    $scope.support = {};
// $scope.$on('$locationChangeSuccess', function(event) {
    $scope.support.sectionTemplate = './templates/pages/support/supportDefault.html';
	$scope.intent = angular.extend($scope.intent || {}, {
	  loadSubSection: function(templateName){
	      console.log('loading subsection:',templateName);
	      console.log($scope.support)
	  	$scope.support.sectionTemplate = './templates/pages/support/'+templateName+'.html';
	      // window.location.hash = 'support/'+templateName;
	  }
	});

  }
]);
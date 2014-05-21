'use strict';

angular.module('directive.skrollr', [])
.directive('skrollr', function() {
  var directiveDefinitionObject = {
    link: function() {

    	// Wait on ngInclude (temporary solution, need to implement ngInclude onLoad())
    	setTimeout(function(){
    		skrollr.init({
    			forceHeight: false
    		});
    	}, 150);

    	// Beginnings of new directive
    	
      	// Refresh all skroller elements
	    // $scope.refreshSkrollr = function(){
	    //   $scope.skrollr.refresh();
	    // };

	    // // Debounce
	    // $scope.debounceSkrollr = _.debounce($scope.refreshSkrollr, 150);

	    // // Call debounce on window resize
	    // $window.onresize = function(){
	    //   $scope.debounceSkrollr();
	    // };
    }
  };

  return directiveDefinitionObject;
});

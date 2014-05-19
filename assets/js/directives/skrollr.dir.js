'use strict';

angular.module('directive.skrollr', [])
  .directive('skrollr', function() {
    return {
      link: function() {
        skrollr.init();

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
  });
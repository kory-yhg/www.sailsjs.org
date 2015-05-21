angular.module('SailsWebsite').controller('FeaturesCtrl', [
  '$scope',
  function($scope) {

    $scope.getOffsetLeft = function(target) {
      var left = $(target).offset().left.toString()+'px';
      console.log(left);
      return left;
    };

    $scope.intent = angular.extend($scope.intent || {}, {

      // For scrolling to any element
      scrollToElement: function(target, time) {
        if(!time) {
          time = 500;
        }

        $('html, body').animate({
          scrollTop: $(target).offset().top - 50
        }, time);
      }

    });
  }
]);

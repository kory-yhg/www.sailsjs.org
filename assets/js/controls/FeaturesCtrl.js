angular.module('SailsWebsite').controller('FeaturesCtrl', [
  '$scope',
  function($scope) {

    var getLeft = function(target) {
      var left = $(target).offset().left.toString()+'px';
      return left;
    };

    $scope.getOffsetLeft = _.throttle(getLeft, 500);
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

    // Scroll to the to when the page loads
    $scope.intent.scrollToElement('#the-top', 500);
  }
]);

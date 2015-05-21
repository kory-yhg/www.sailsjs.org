angular.module('SailsWebsite').controller('GetStartedCtrl', [
  '$scope',
  function($scope) {


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

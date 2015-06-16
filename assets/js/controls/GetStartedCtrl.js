angular.module('SailsWebsite').controller('GetStartedCtrl', [
  '$scope', '$window',
  function($scope, $window) {


    var getLeft = function(target) {
      var left = $(target).offset().left.toString()+'px';
      return left;
    };



    $scope.getOffsetLeft = _.throttle(getLeft, 500);

    $scope.intent = angular.extend($scope.intent || {}, {

      // For scrolling to any element
      scrollToElement: function(target, time) {
        console.log($(target));
        if(!time) {
          time = 500;
        }

        $('html, body').animate({
          scrollTop: $(target).offset().top - 100
        }, time);
      }

    });


    var permalink = $window.location.hash.split('#?')[1];
    // If there is a permalink to a section in the route, scroll to that section
    if(permalink) {
      var permalinkElement = '#'+permalink;
      $scope.intent.scrollToElement(permalinkElement);
    }
    // Otherwise, scroll to the to when the page loads
    else {
      $scope.intent.scrollToElement('#the-top', 500);
    }
  }
]);

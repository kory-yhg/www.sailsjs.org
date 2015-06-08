angular.module('SailsWebsite').controller('HeaderCtrl', [
  '$scope',
  '$window',
  '$timeout',
  '$location',
  function($scope, $window, $timeout, $location) {

    // Check for the old '/#/' and '/#!/' links and redirect to the right place.
    if($window.location.hash) {
      var redirectTo = $window.location.hash.replace(/#/g, '').replace(/!/g, '');
      if(redirectTo[0] === '/') {
        redirectTo = redirectTo.replace(/\//, '');
      }
      $window.location.hash = '';
      $window.location.pathname = redirectTo;
    }

    // Qualifiers
    $scope.getIsCurrentPage = function(path) {
      var current = $window.location.pathname;
      return current === '/' + path;
    };

    $scope.getIsDocumentationPage = function() {
      var currentPath = $window.location.pathname;
      if(currentPath.indexOf('documentation') > 0) {
        return true;
      }
      else return false;
    };

    $scope.getIsSupportPage = function() {
      var currentPath = $window.location.pathname;
      if(currentPath.indexOf('support') > 0) {
        return true;
      }
      else return false;
    };

    $scope.getIsCurrentDocSection = function(path) {
      var currentPath = $window.location.pathname;
      if(currentPath.indexOf(path) > 0) {
        return true;
      }
      else return false;
    };

  }
]);

angular.module('Sails').controller('SupportCtrl', [
  '$scope',
  '$window',
  '$location',
  function($scope, $window, $location) {

    // Houses the state for the support pages.
    // Should never be reset (only its properties changed)
    $scope.support = {};

    $scope.support.sectionTemplate = './templates/pages/support/supportDefault.html';

    $scope.intent = angular.extend($scope.intent || {}, {
      loadSubSection: function(templateName) {
        $scope.support.sectionTemplate = './templates/pages/support/' + templateName + '.html';
      }
    });

  }
]);

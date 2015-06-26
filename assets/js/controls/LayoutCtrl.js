angular.module('SailsWebsite').controller('LayoutCtrl', [
  '$scope',
  function($scope) {

    $scope.menu = {};
    $scope.menu.visible = false;

    $scope.intent = angular.extend($scope.intent || {}, {

      showMenu: function() {
        $scope.menu.visible = true;
      },

      hideMenu: function() {
        $scope.menu.visible = false;
      }

    });

  }
]);

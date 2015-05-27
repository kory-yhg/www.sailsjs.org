angular.module('SailsWebsite').controller('ReferenceCtrl', [
  '$scope',
  '$window',
  '$timeout',
  '$location',
  function($scope, $window, $timeout, $location) {

    /**************
    * Initially...
    ***************/

    $scope.menuData = window.MENU_DATA;

    $scope.expandedMenuItems = [];

    // Find out what page we're on:
    var currentSlug = $window.location.search.split('?page=')[1];
    currentSlug = currentSlug.replace(/%20/g, ' ');
    var currentPage = _.find($scope.menuData, {slug: currentSlug});
    // Then mark it as 'expanded'
    $scope.expandedMenuItems.push(currentPage.id);
    // If it's a child, also expand the parent.
    if(currentPage.isChild) {
      expandParent(currentSlug);
    }






    /*******************
     * Helper functions
     *******************/

    /**
     * Given a particular slug, find the first menu item in `$scope.menuData`
     * that has that slug as a child in its "children" array (aka its parent.)
     *
     * If we find said parent, then push its id (aka slug) onto `$scope.expandedMenuItems`.
     * If we don't, throw an Error beause `currentParent.id` will be like `undefined.id`.
     *
     * Back to the case where we do find said parent, if it has any parents of its own, then
     * call this function again, recursively, to expand that parent.
     *
     * TODO: fix throwy thing
     *
     * @param  {[type]} slug [description]
     * @return {[type]}      [description]
     */
    function expandParent(slug) {
      // Find the menu item that has the current 'slug' as a child.
      var currentParent = _.find($scope.menuData, function(menuItem) {
        // // First lowercase the children, since the slug is lowercase
        // var lowerCaseChildren = [];
        // _.each(menuItem.children, function(child){
        //   lowerCaseChildren.push(child.toLowerCase());
        // });
        // // If the slug is in the array, this must be the parent.
        // return _.contains(lowerCaseChildren, slug);
        return _.contains(menuItem.children, slug);
      });
      // Add the parent's id to the array of expanded things.
      $scope.expandedMenuItems.push(currentParent.id);
      // If this parent also has a parent, call the function again.
      if(currentParent.isChild) {
        expandParent(currentParent.id);
      }
    }






    /*************
     * Qualifiers
     *************/

    $scope.getIsCurrent = function(slug) {
      if($window.location.pathname.indexOf('?page='+slug) > -1) {
        return true;
      } else {
        return false;
      }
    };


    $scope.getIsExpanded = function(id) {
      if(_.contains($scope.expandedMenuItems, id)) {
        return true;
      } else {
        return false;
      }
    };


    /*********************************
    * Events triggered by user intent
    **********************************/
    $scope.intent = angular.extend($scope.intent || {}, {


    });

  }
]);

angular.module('SailsWebsite').controller('DocsCtrl', [
  '$scope',
  '$window',
  '$timeout',
  '$location',
  function($scope, $window, $timeout, $location) {

    /**************
    * Initially...
    ***************/

    // Set the exposed menu data on the $scope
    $scope.menuData = window.MENU_DATA;

    // Make empty arrays of 'expanded' and 'parent' menu items --
    // (We'll add stuff here later in order to show the
    // 'expanded' and 'current parent' styles in the UI.)
    $scope.expandedMenuItems = [];
    $scope.parentMenuItems = [];

    var permalink = $window.location.search.split('?q=')[1];
    if(permalink) {
      $('html, body').animate({
        scrollTop: $('#'+permalink).offset().top - 50
      }, 500);
    }
    // TODO: update this when we aren't using '?page='
    // Find the slug for the page we're on:
    var currentSlug = $window.location.pathname.replace(/\/documentation\//, '');
    // Some slugs have spaces, which are changed to '%20' in the URL --
    // replace any occurences of '%20' with a space,
    // so it matches the slug in the menu data.
    // Also, get rid of the '?q=' from the permalinks.
    currentSlug = currentSlug.replace(/%20/g, ' ').replace(/\?q=.+$/, '');
    console.log(currentSlug);
    // Use the slug to find the data for the page we're currently on
    var currentPage = _.find($scope.menuData, {slug: currentSlug});
    // Then mark that menu item as 'expanded' by adding it to `$scope.expandedMenuItems`
    $scope.expandedMenuItems.push(currentPage.slug);
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
        // // If the slug is in the `children` array, this must be the parent.
        return _.contains(menuItem.children, slug);
      });
      // Add the parent's id to the array of expanded things.
      $scope.expandedMenuItems.push(currentParent.slug);
      // And to the array of 'parentMenuItems' to set 'current-parent' styles in the UI.
      // (Because this won't get run if someone is just expanding things;
      // it only happens after navigating to a menu item.)
      $scope.parentMenuItems.push(currentParent.slug);
      // If this parent also has a parent, call the function again.
      if(currentParent.isChild) {
        expandParent(currentParent.slug);
      }
    }




    /*************
     * Qualifiers
     *************/

    $scope.getIsCurrent = function(slug) {
      // TODO: update this when we aren't using '?page='
      if($window.location.pathname.replace(/\/documentation\//, '') === slug) {
        return true;
      } else {
        return false;
      }
    };


    $scope.getIsParent = function(slug) {
      if(_.contains($scope.parentMenuItems, slug)) {
        return true;
      }
      else return false;
    };


    $scope.getIsExpanded = function(slug) {
      if(_.contains($scope.expandedMenuItems, slug)) {
        var menuItem = _.find($scope.menuData, {slug: slug});
        if(menuItem.children.length > 0) {
          return true;
        }
        else return false;
      }
      else return false;
    };


    /*********************************
    * Events triggered by user intent
    **********************************/
    $scope.intent = angular.extend($scope.intent || {}, {

      toggleExpanded: function(slug) {
        // If the slug is in the list of expanded items, remove it
        // so that it will no longer have the 'expanded' styles in the UI
        if(_.contains($scope.expandedMenuItems, slug)) {
          _.remove($scope.expandedMenuItems, function(item) {
            return item === slug;
          });
        }
        // Otherwise, add it to the list so it will 'expand' in the UI.
        else {
          $scope.expandedMenuItems.push(slug);
        }
      }

    });

  }
]);

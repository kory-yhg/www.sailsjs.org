angular.module('Sails')
.directive('openLinksToExternalUrlsInNewTab', [

/**
 * Dependencies
 */

        '$interval', 'dateFilter',
function($interval ,  dateFilter ) {


  /**
   * openLinksToExternalUrlsInNewTab
   *
   * @class        {angular.directive}
   * @module       Sails
   * @type         {Function}
   * @description  Adds target="_blank" to all descendant anchor tags with
   *               href attributes pointing to an external URL. Inspired by
   *               http://stackoverflow.com/a/20343013/486547 but with
   *               modifications to make it work with nested scopes and
   *               not-yet-loaded content.
   *
   * ---------------------------------------------------------
   * Usage:
   *
   *
   * <div open-links-to-external-urls-in-new-tab>
   *   ...
   *   <!--
   *   All descendant <a> tags w/ hrefs to an external domain
   *   will open in a new tab
   *   -->
   *   ...
   * </div>
   *
   */

  function render (scope, element, attrs) {
    var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
    elems.attr("target", "_blank");
    console.log('DIRECTIVE TIME BABY, found %d of them <a> tags', elems.length);
  }

  // exports
  return {
    link: function(scope, element, attrs) {
      scope.$on('$includeContentRequested', function onNgInclude () {
        render(scope,element,attrs);
      });
    }
  };

}]);



// The extremely jank approach, for posterity:
//
// start the UI update process; save the lapTimer for canceling
// var lapTimer;
// lapTimer = $interval(function() {
//   _render(); // update DOM
// }, 200);
// element.on('$destroy', function() {
//   $interval.cancel(lapTimer);
// });

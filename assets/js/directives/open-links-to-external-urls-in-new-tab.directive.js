angular.module('SailsWebsite')
.directive('openLinksToExternalUrlsInNewTab', [

/**
 * Dependencies
 */

        '$interval',
function($interval ) {


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

  function render (scope, $el, attrs) {

    // TODO:
    // Honestly we should just do this in the build script.
    // Removing it for now... Ugh. what was I thinking

    var $ = angular.element;


    // So here's the problem-- this is slow and ugly b/c it blocks:
    // $el.find('a[href^="http"]').each(function () {
    //   $(this).attr('target', '_blank');
    // });



    // So we have to do something weirder to give the DOM
    // some room to breathe

    // First grab the anchors
    var $anchors = $el.find('a[href^="http"]');

    // console.log('Found %d anchors: ',$anchors.length, $anchors);

    // Now we'll try some poor man's async, popping off
    // the <a> tags checking if they're external, and if so
    // updating them in the DOM.
    // (but no more than one every few ms so we don't lock the UI)
    var alarm = $interval(function (){
      if (!$anchors.length) {
        $interval.cancel(alarm);
        return;
      }

      var $it = $(Array.prototype.pop.call($anchors));

      // if it points to an external domain, update it in the DOM
      var href = $it.attr('href');
      var isExternal =
      // Don't need to check this right now:
      // (
      //   (href||'')
      //   .match(/^https?:\/\//)
      // ) &&
      !(
        (href||'')
        .match(/^https?:\/\/(sailsjs\.org|beta\.sailsjs\.org)/)
      );

      if (isExternal) {
        // console.log('Decorating link to external url "%s"...', $it.attr('href'));
        $it.attr('target', '_blank');
      }
    }, 15);

    // If the element this directive is attached to is removed,
    // cancel the interval so we don't leak events.
    $el.on('$destroy', function() {
      $interval.cancel(alarm);
    });
  }

  // exports
  return {
    link: function(scope, element, attrs) {
      // scope.$on('$includeContentRequested', function onNgInclude (e) {
      scope.$on('$includeContentLoaded', function onNgInclude (e) {
        // console.log('nginclude:',e.targetScope);
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

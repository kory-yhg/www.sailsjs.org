angular.module('Sails')
.directive('permalink', [

/**
 * Dependencies
 */


function() {


  /**
   * permalink
   *
   * @class        {angular.directive}
   * @module       Sails
   * @type         {Function}
   * @description  Adds a little deal that you can click to build a permalink to
   *               a particular heading within a page on the site.
   *
   * ---------------------------------------------------------
   * Usage:
   *
   * <h1 permalink="want-to-learn-kungfu">Want to learn Kung.Fu?</h1>
   *
   */

  function render (scope, $el, attrs) {

    var link;
    // if hash already contains ?q= at the end, remove it before continuing
    link = window.location.hash.replace(/\?q=.+$/, '');
    link += '?q='+attrs.permalink;

    var $ = angular.element;
    var html = '<a href="'+link+'" class="permalink-thing">#</a>';
    $(html).insertAfter($el);
  }

  // exports
  return {
    link: function(scope, element, attrs) {
      render(scope,element,attrs);
    }
  };

}]);



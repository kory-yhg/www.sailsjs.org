var menu = {};
angular.module('Sails').factory('Menu', function() {

  var Menu = function() {};


  Menu.prototype.all = _all();

  return new Menu();


  ///////                 /////////
  ///////                 /////////
  ///////                 /////////
  /////// PRIVATE METHODS /////////
  ///////       ||        /////////
  ///////       \/        /////////
  ///////                 /////////

  /**
   * _all()
   *
   * @return {Function} which builds a flat menu tree representing
   * the menu items in the specified jsMenu.
   */
  function _all (){
    return _.memoize(function(_jsMenuIdentity) {
      var pathToJSMenu = getTemplatePath('assets/templates/jsmenus/'+_jsMenuIdentity+'.jsmenu');

      // Call the menu from the JST object then get rid of 'assets/templates' prefix
      // on every key before the text is parsed into JSON.
      var jsMenu = parseMenu(JST[pathToJSMenu]().replace(/assets\/templates\//ig,''));
      // console.log(JSON.stringify(jsMenu))

      console.log('Parsed',_jsMenuIdentity,':',jsMenu);

      _(jsMenu).map(function(mItem) {
        mItem.id = mItem.id||mItem.fullPathAndFileName;

        // Derive the `templateSrc` from `templatePath` (so ngIncludes will work)
        mItem.templateSrc = '/templates/'+mItem.fullPathAndFileName;

        // Tag w/ label (label===data.displayName)
        mItem.label = mItem.label||(mItem.data && mItem.data.displayName);

        // Set the "href" (where to go when this thing is clicked)
        mItem.href = '#/documentation/'+mItem.fullPathAndFileName;

        // If this menu item has children, snip off the last part of its href
        if (mItem.children) {
          // But save the original as `alternateHref` to avoid breaking links
          mItem.alternateHref = mItem.href;
          mItem.href = mItem.href.replace(/\/[^\/]*\.html$/, '');
        }
        // Finally, trim trailing slashes & slugify the href
        mItem.href = mItem.href
        .replace(/[\s\(\)\\\[\]\{\}]/, '-')
        .replace(/\/$/,'');
        if (mItem.alternateHref) {
          // Only partially slugify `alternateHref`s to avoid breaking links
          mItem.alternateHref = mItem.alternateHref
          .replace(/[\s\(\)\\\[\]\{\}]/, '-')
          .replace(/\/$/,'');
        }

        return mItem;
      });

      return jsMenu;
    });
  }


  /**
   * [parseMenu description]
   * @param  {[type]} menuObject [description]
   * @return {[type]}            [description]
   */
  function parseMenu(menuObjectReturnValue) {
    try {
      var theMenu = JSON.parse(menuObjectReturnValue);
      return theMenu;
    } catch (menuParseError) {
      console.error('error:', menuParseError);
      return {};
    }
  }

  /**
   * [getTemplatePath description]
   * @param  {[type]} keyContains [description]
   * @return {[type]}             [description]
   */
  function getTemplatePath(keyContains) {
    for (var key in JST) {
      if (key.indexOf(keyContains) >= 0) {
        return key;
      }
    }
  }

});

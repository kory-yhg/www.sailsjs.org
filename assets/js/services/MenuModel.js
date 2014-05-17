angular.module('Sails').factory('Menu', function() {

  var Menu = function() {};


  // Menu.prototype.originalWay = function(topLevelSectionID) {
  //   return flattenJST(topLevelSectionID, JST);
  // };

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
      var jsMenu = parseMenu(JST[pathToJSMenu]);
      var subMenu = jsMenu.assets.templates[_jsMenuIdentity];
      var flatSubMenu = []; flattenMenu(subMenu, function(_menu) {flatSubMenu = _menu;});

      _(flatSubMenu).map(function(mItem) {
        // Tag w/ id (id===templatePath)
        mItem.id = mItem.id||mItem.templatePath;
        // Derive the `templateSrc` from `templatePath` (so ngIncludes will work)
        mItem.templateSrc = mItem.templatePath.replace(/^assets\//, '/');
        // Tag w/ label (label===data.displayName)
        mItem.label = mItem.label||(mItem.data && mItem.data.displayName);

        // Set the "href" (where to go when this thing is clicked)
        mItem.href = '#/documentation/'+mItem.id.replace(new RegExp('^assets/templates/?'), '');
        // If this menu item has children, snip off the last part of its href
        if (mItem.children) { mItem.href = mItem.href.replace(/\/[^\/]*\.html$/, ''); }
        // Finally, slugify the href
        mItem.href = mItem.href.replace(/[\s\.\(\)\\\[\]\{\}]/, '-');

        return mItem;
      });

      return flatSubMenu;
    });
  }


  /**
   * [parseMenu description]
   * @param  {[type]} menuObject [description]
   * @return {[type]}            [description]
   */
  function parseMenu(menuObject) {
    console.log('trying to parse menu');
    try {
      var theMenu = JSON.parse(menuObject());
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

  /**
   * [flattenMenu description]
   * @param  {[type]}   menuObject [description]
   * @param  {Function} cb         [description]
   * @return {[type]}              [description]
   */
  function flattenMenu(menuObject, cb) {
    var checkThese = [menuObject];
    var saveThese = [];

    function findLineage(sectionName, arrayOfChildren) {
      var findFather = _.findIndex(arrayOfChildren, {
        'name': sectionName + '.html'
      });
      var father = arrayOfChildren.splice(findFather, 1).pop();
      var children = arrayOfChildren;
      father.children = _.pluck(children, 'templatePath');

      var returnThis = [father].concat(_.map(children, function(kid) {
        kid.father = father.templatePath;
        // console.log(kid.name,'is child of',father.name,father);
        return kid;
      }));

      // Add JST template to every docObject and return
      return _.forEach(returnThis, function(obj) {
        obj.linkerTemplate = JST[getTemplatePath(obj.templatePath)];
      });
      // return returnThis;
    }

    function flattenSection() {
      var section = checkThese.shift();
      for (var key in section) {
        if (section[key].children && section[key].children.length) {
          saveThese = saveThese.concat(findLineage(key, section[key].children));
          checkThese.push(section[key]);
        }
      }

      if (!checkThese.length) {
        //console.log('done',saveThese)
        return cb(saveThese);
      } else {
        flattenSection();
      }
    }

    flattenSection();
  }


});

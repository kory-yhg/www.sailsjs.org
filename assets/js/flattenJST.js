/**
 * [flattenJST description]
 * @param  {String} subsection [the subfolder to parse (e.g. the "foo" in "assets/templates/foo")]
 * @param  {Object} JST        [you know]
 * @return {[type]}            [description]
 */
function flattenJST (subsection, JST) {

  // Convert JST templates object into an array
  var menuData = _.reduce(JST, function (memo, val, key) {
    memo.push({
      templatePath: key,
      fn: val
    });
    return memo;
  }, []);


  // Isolate the useful parts of the menu
  // and cut out the bogus parts
  menuData = _.remove(menuData, function fnThatReturnsFalseWhenWeWantToGetRidOfTheThing (menuItem) {
    var IS_RELEVANT_REGEXP = new RegExp('^assets/templates/'+subsection);

    var isBogus = menuItem.templatePath.match(/\.jsmenu$/);
    var isRelevant = menuItem.templatePath.match(IS_RELEVANT_REGEXP);
    if (isBogus || !isRelevant) return false;
    else return true;
  });




  // Flatten and decorate menu data
  menuData = _.map(menuData, function forEachMenuItem (menuItem) {

    // Trim the templatePath to make it relative to the `assets/` directory.
    menuItem.templatePath = menuItem.templatePath.replace(/^assets\//,'');

    // Split up that template path (i.e. `menuItem.templatePath`)
    var pieces = menuItem.templatePath.split('/');

    // Chop off the prefix part (e.g. `templates/`)
    pieces.shift();
    // and the top-level mmenu item part (e.g. "reference/" or "anatomy/")
    // pieces.shift();
    // console.log(pieces);


    // Set the "href" (where to go when this thing is clicked)
    menuItem.href = '#/documentation/'+pieces.join('/');

    // Set the "name" to be the ugly file name
    menuItem.name = pieces.pop();

    menuItem.pieces = pieces;

    return menuItem;
  });



  // Determine the parent for each menu item
  var virtualMenuItems = [];
  menuData = _.map(menuData, function (menuItem) {
    menuItem.parentName = findOrCreateParent(menuItem.pieces, virtualMenuItems);

    // Remove extraneous things
    delete menuItem.pieces;

    return menuItem;
  });
  // Finally, push those extra dads onto the menu
  menuData = menuData.concat(_.uniq(virtualMenuItems));
  // (make sure there are no duplicate dads)
  menuData = _.uniq(menuData);

  // Precalculate each menuItem's children (their "names" I mean)
  _.map(menuData, function (menuItem) {
    menuItem.children = _(menuData)
      .where({ parentName: menuItem.name })
      .pluck('name').valueOf();
    return menuItem;
  });

  return menuData;





  // Now that we know everybody's name, let's find their dads
  //
  // (we need this extra dad holding tank in case we need to create
  // some dads-- and it's weird to create them with the rest of the menu
  // items because what if it got confused)
  function findOrCreateParent(pieces, virtualMenuItems) {

    // If we ran out of pieces, there is no dad.
    if (!pieces.length) return null;

    // Build an href for our dad
    var parentHref = '#/documentation/'+pieces.join('/')+'/';
    // console.log(parentHref);

    // Find out our dad's name by popping a piece
    var parentName = pieces.pop();

    // If this is the last piece, and it has the same name
    // as our top-level section, ignore it
    if (parentName === subsection && pieces.length === 0) return null;

    // Build a template path for our dad
    var parentTemplatePath = _(menuData).where({name: parentName + '.html'}).pluck('templatePath').first();

    // console.log('they are '+virtualMenuItems.length+' DADS IN THE HOLDING tank', virtualMenuItems);

    // Find this menu item's dad (note that he might be in `virtualMenuItems`)
    var parentMenuItem =
      _.findWhere(menuData, {name: parentName}) ||
      _.findWhere(virtualMenuItems, {name: parentName});

    // Otherwise, if the parent menu item doesn't exist already,
    // we have to create a virtual one and add it to our collection
    // of `virtualMenuItems`
    if (!parentMenuItem) {
      parentMenuItem = newVirtualParent({
        name: parentName,
        href: parentHref,
        templatePath: parentTemplatePath,
        pieces: pieces
      }, virtualMenuItems);
    }

    return parentMenuItem.name;
  }


  /**
   * Create a new virtual menu item.
   * NOTE: also adds it to the `virtualMenuItems` collection
   *
   * @option {String} name
   * @option {String} templatePath
   * @option {String} href
   * @option {String[]} pieces
   */
  function newVirtualParent (opts, virtualMenuItems) {

    var dad = {
      name: opts.name,
      templatePath: opts.templatePath,
      href: opts.href,
      parentName: null // (but will be calculated momentarily)
    };

    virtualMenuItems.push(dad);

    // Now we have to go find the new virtual menu item's parent:
    dad.parentName = findOrCreateParent(opts.pieces, virtualMenuItems);

    return dad;
  }


}

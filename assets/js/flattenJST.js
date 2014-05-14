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




  // Flatten menu data
  menuData = _.map(menuData, function(menuItem) {

    //
    // For each menu item:
    //

    // Trim the templatePath
    menuItem.templatePath = menuItem.templatePath.replace(/^assets\//,'');

    // Split up that template path (i.e. `menuItem.templatePath`)
    var pieces = menuItem.templatePath.split('/');


    // Chop off the extraneous bullshit and get down...
    // ...to business.  Mmm girl
    if(subsection === 'reference') {
      pieces.shift();
    } else if(subsection === 'anatomy') {
      pieces.shift();
      pieces.shift();
    }


    // Set the "name" to be the ugly file name
    menuItem.name = pieces.pop();

    menuItem.pieces = pieces;

    return menuItem;
  });

  // Make sure all the dads are there
  var allExtraDads = [];
  menuData = _.map(menuData, function (menuItem) {

    menuItem.parentName = locateOrCreateDadAndTheirDadsEtc(menuItem.pieces, allExtraDads);

    // Push these extra dads onto the cumulative array
    // of all the extra dads
    // console.log('ok next dad (heres all the extra dads we got now:',allExtraDads,')');

    // Remove extraneous things
    delete menuItem.pieces;

    return menuItem;
  });

  // console.log('here are the '+allExtraDads.length + ' dads',allExtraDads);

  // Finally, push those extra dads onto the menu
  menuData = menuData.concat(_.uniq(allExtraDads));
  // (make sure there are no duplicate dads)
  menuData = _.uniq(menuData);


  // Precalculate each menuItem's children (their "names" I mean)
  _.map(menuData, function (menuItem) {
    menuItem.children = _.where(menuData, { parentName: menuItem.name });
    // "pluck" the children
    menuItem.children = _.pluck(menuItem.children, 'name');
    return menuItem;
  });


  return menuData;








  // Private functino \/


  // Now that we know everybody's name, let's find their dads
  //
  // (we need this extra dad holding tank in case we need to create
  // some dads-- and it's weird to create them with the rest of the menu
  // items because what if it got confused)
  function locateOrCreateDadAndTheirDadsEtc(pieces, dadHoldingTank) {

    // If we ran out of pieces, there is no dad.
    if (!pieces.length) return null;

    // Find out our dad's name by popping a piece
    var parentName = pieces.pop();

    // console.log('they are '+dadHoldingTank.length+' DADS IN THE HOLDING tank', dadHoldingTank);

    // Find dad
    // (note that he might be in the dad holding tank!!)
    var dad = _.findWhere(menuData, {name: parentName});
    if (!dad) {
      // console.log('looking for ',parentName,'in the holding tank:',dadHoldingTank);
      dad = _.findWhere(dadHoldingTank, {name: parentName});
    }

    // If we still don't have a dad, we have to make one
    if (!dad) {
      dad = {
        name: parentName,
        parentName: null
      };
      dadHoldingTank.push(dad);
      // console.log('WE HAD TO MAKE THIS DADS', dad, '(we were looking for a dad named '+parentName+')');
      dad.parentName = locateOrCreateDadAndTheirDadsEtc(pieces, dadHoldingTank);
    }


    return dad.name;
  }
}

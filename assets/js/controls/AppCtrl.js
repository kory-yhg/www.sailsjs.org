function getTemplatePath(keyContains){
      for (var key in JST){
          if (key.indexOf(keyContains)>=0){
            return key
          }
      }
};
function flattenMenu(menuObject,cb){
    var checkThese = [menuObject];
    var saveThese = [];

    function findLineage(sectionName,arrayOfChildren){
      var findFather = _.findIndex(arrayOfChildren, { 'name': sectionName+'.html' });
      var father = arrayOfChildren.splice(findFather,1).pop();      
      var children = arrayOfChildren;
      father.children = _.pluck(children,'templatePath')

      var returnThis = [father].concat(_.map(children, function(kid) {
        kid.father = father.templatePath;
        // console.log(kid.name,'is child of',father.name,father);
        return kid
      }));

      // Add JST template to every docObject and return
      return _.forEach(returnThis,function(obj) {obj.linkerTemplate = JST[getTemplatePath(obj.templatePath)]});
      // return returnThis;
};

function flattenSection(){
      var section = checkThese.shift();
        for (key in section){
          if (section[key].children && section[key].children.length){
            saveThese = saveThese.concat(findLineage(key,section[key].children));
            checkThese.push(section[key])
          }

        }

      if (!checkThese.length){
        //console.log('done',saveThese)
        return cb(saveThese)
      } else {
        flattenSection()
      }


    };

    flattenSection();
};

function parseMenu(menuObject){
      console.log('trying to parse menu')
          try {
              var theMenu = JSON.parse(menuObject());
              return theMenu;
          } catch(menuParseError){
              console.log('error:',menuParseError)
              return {};
          };
};

var datMenu = [];

angular.module('Sails').controller('AppCtrl', [
  '$scope',
  'Menu',

  function($scope, Menu) {

    var getReferenceMenu = parseMenu(JST[getTemplatePath('assets/templates/jsmenus/reference.jsmenu')]);
    var referenceMenu = getReferenceMenu.assets.templates.reference;

    flattenMenu(referenceMenu,function(menu){
      console.log('Heres the flat menu!',menu);
    datMenu = menu;
    });
    // Houses the state for the documentation pages.
    // Should never be reset (only its properties changed)
    $scope.docs = {};

    // var referenceMenuData = flattenJST('reference', JST);
    // var referenceMenuOrphans = _.where(referenceMenuData, {parentName: null});
    // $scope.referenceMenu = referenceMenuOrphans;
    // MENU=referenceMenuData;

    // var anatomyMenuData = flattenJST('anatomy', JST);
    // var anatomyMenuOrphans = _.where(anatomyMenuData, {parentName: null});
    // $scope.anatomyMenu = anatomyMenuOrphans;

    // $scope.docs.menu


    // Qualifiers
    $scope.getIsCurrentPage = function( path ) {
      var current = window.location.hash;
      return current === '#'+path;
    };

    $scope.intent = angular.extend($scope.intent || {}, {

      /**
       * goto()
       *
       * Navigate to the specified client-side route.
       *
       * @param  {String} hash (e.g. #/foo/bar, #/blah)
       */
      goto: function (hash) {
        window.location.hash = hash;
      },

      toggleMenuItem: function (id) {
        var $menuItem = $scope.docs.findMenuItemByID(id,$scope.docs.visibleMenu);

        if ($menuItem.expanded) {
          $scope.intent.collapseMenuItem(id);
        }
        else {
          $scope.intent.expandMenuItem(id);
        }
      },

      expandMenuItem: function (id) {
        var globalMenu = Menu.all($scope.docs.sectionID);

        // Find the targeted menu item in the visible menu and expand it
        var $menuItem = $scope.docs.findMenuItemByID(id,$scope.docs.visibleMenu);

        if (!$menuItem){
          if (typeof console !== 'undefined') console.error('couldn\'t expand because couldnt find ('+id+')');
          return;
        }

        $menuItem.expanded = true;
        $menuItem.visibleChildren = _.where(globalMenu,{ parentName: $menuItem.name });
      },

      collapseMenuItem: function (id) {
        var $menuItem =_.find($scope.docs.visibleMenu, {name:id});
        if (!$menuItem){
          if (typeof console !== 'undefined') console.error('couldn\'t collapse because couldnt find ('+id+')');
          return;
        }
        $menuItem.expanded = false;
        $menuItem.visibleChildren = [];
      },

      // showTemplateForReferenceItem: function (id) {
      //   var thisMenuItem = _.findWhere(referenceMenuData, { name: id });
      //   var overviewTemplate = _.findWhere(referenceMenuData, { name: id+'.html' });

      //   if (thisMenuItem.templatePath) {
      //     $scope.currentPage = thisMenuItem;
      //   } else if(overviewTemplate) {
      //     $scope.currentPage = overviewTemplate;
      //   }
      // },
      // toggleReferenceItemExpanded: function (id) {
      //   var thisMenuItem = _.findWhere(referenceMenuData, { name: id });

      //   if (!thisMenuItem.expanded) {
      //     $scope.intent.expandMenuItem(referenceMenuData, id);
      //   }
      //   else {
      //     $scope.intent.collapseMenuItem(referenceMenuData,id);
      //   }
      // },
      // showTemplateForAnatomyItem: function (id) {
      //   var thisMenuItem = _.findWhere(anatomyMenuData, { name: id });
      //   var overviewTemplate = _.findWhere(anatomyMenuData, { name: id+'.html' });

      //   if (thisMenuItem.templatePath) {
      //     $scope.currentPage = thisMenuItem;
      //   } else if(overviewTemplate) {
      //     $scope.currentPage = overviewTemplate;
      //   }
      // },
      // toggleAnatomyItemExpanded: function (id) {
      //   var thisMenuItem = _.findWhere(anatomyMenuData, { name: id });

      //   if (!thisMenuItem.expanded) {
      //     $scope.intent.expandMenuItem(anatomyMenuData, id);
      //   }
      //   else {
      //     $scope.intent.collapseMenuItem(anatomyMenuData,id);
      //   }
      // }
    });
  }
]);

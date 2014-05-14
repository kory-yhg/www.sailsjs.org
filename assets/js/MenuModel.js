angular.module('Sails').factory('Menu', function () {

  var buildMenuOrUseCache = _.memoize(function (_topLevelSectionID) {
    return flattenJST(_topLevelSectionID, JST);
  });


  var Menu = function () {};
  Menu.prototype.all = function (topLevelSectionID) {
    return buildMenuOrUseCache(topLevelSectionID);
  };

  return new Menu();
});

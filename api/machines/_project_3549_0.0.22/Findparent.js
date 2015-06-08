module.exports = {
  "inputs": {
    "menuData": {
      "id": "d6d19827-81cc-4c8c-8bf7-15ddca7b472e",
      "friendlyName": "menu data",
      "description": "",
      "example": [],
      "required": true,
      "addedManually": true
    },
    "slug": {
      "friendlyName": "slug",
      "description": "The current doc page 'slug'",
      "example": "idk/something",
      "required": true,
      "addedManually": true
    }
  },
  "exits": {
    "error": {
      "example": undefined
    },
    "success": {
      "id": "success",
      "friendlyName": "then",
      "description": "Normal outcome.",
      "example": [
        "idk/something"
      ]
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var _ = require('lodash');

    var expandedMenuItems = [];

    // Some slugs have spaces, which are changed to '%20' in the URL --
    // replace any occurences of '%20' with a space,
    // so it matches the slug in the menu data.
    inputs.slug = inputs.slug.replace(/%20/g, ' ');

    expandedMenuItems.push(inputs.slug);

    var currentPage = _.find(inputs.menuData, {
      slug: inputs.slug
    });
    if (currentPage && currentPage.isChild) {
      expandParent(inputs.slug);
    }

    function expandParent(slug) {
      // Find the menu item that has the current 'slug' as a child.
      var currentParent = _.find(inputs.menuData, function(menuItem) {
        // If the slug is in the `children` array, this must be the parent.
        return _.contains(menuItem.children, slug);
      });

      // Add the parent's id to the array of expanded things.
      expandedMenuItems.push(currentParent.slug);

      // If this parent also has a parent, call the function again.
      if (currentParent.isChild) {
        expandParent(currentParent.slug);
      }
    }



    return exits.success(expandedMenuItems);
  },
  "identity": "Findparent"
};
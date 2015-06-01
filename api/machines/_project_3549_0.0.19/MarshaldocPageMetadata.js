module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "f09f3994-de73-4499-a1e3-b55cc3467d5b",
      "friendlyName": "Doc Page Metadatas",
      "description": "",
      "typeclass": "array",
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
      "example": [{
        "path": "creating-a-machinepack/Getting-Started.ejs",
        "slug": "creating-a-machinepack/getting-started",
        "displayName": "Foo Bar",
        "children": [
          "some/unique/path/like/this.ejs"
        ],
        "id": "creating-a-machinepack/getting-started",
        "parent": "creating-a-machinepack",
        "isChild": true,
        "isParent": false
      }]
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var path = require('path');
    var _ = require('lodash');

    // Before formatting the metadata, sort each doc page's `children` array,
    // First by whether it has children (i.e. can be expanded), then alphabetically.
    inputs.docPageMetadatas = _.map(inputs.docPageMetadatas, function sortDocPageChildren(docPage) {
      if (docPage.children && docPage.children.length > 0) {

        // Create an array with data about the docPage's children
        var childrenData = [];

        _.each(docPage.children, function makeListOfChildrenWithData(child) {
          var childData = _.find(inputs.docPageMetadatas, {
            fullPathAndFileName: child
          });
          childrenData.push(childData);
        });

        // Now sort it by 'isParent' and 'displayName'.
        childrenData = _.sortByOrder(childrenData, ['isParent', 'displayName'], [false, true]);

        // Now put it back the way it was.
        var sortedChildren = [];
        _.each(childrenData, function(child) {
          sortedChildren.push(child.fullPathAndFileName)
        });
        docPage.children = sortedChildren;
      }
      return docPage;
    });

    // Marshal menu metadata
    inputs.docPageMetadatas = _.map(inputs.docPageMetadatas, function normalizeEachDocPage(docPage) {

      // Rename `fullPathAndFileName`
      docPage.path = docPage.fullPathAndFileName;

      // Create the 'slug' (the path lowercased)
      docPage.slug = docPage.path.toLowerCase()
        // then create an id for places where slug makes things tricky,
        // that's just the slug with dashes instead of slashes.
      docPage.id = docPage.slug.replace(/[^a-z0-9]/g, '-');

      // Determine the display name-- either use the data bundled as <docmeta> tags, or
      // take the slug and make a reasonable guess based on some formatting conventions.
      docPage.displayName = docPage.data.displayName || _.startCase(docPage.slug); //slug.replace(/-/g, ' ');

      // Normalize each child in the array using the same logic we used to generate our slug
      docPage.children = _.map(docPage.children, function slugifyEachChild(child) {
        return child.toLowerCase();
      });

      if (docPage.children.length) {
        docPage.isParent = true;
      }

      return docPage;
    });

    // Now sort the metadatas, first by 'isParent', then by 'displayName'.
    inputs.docPageMetadatas = _.sortByOrder(inputs.docPageMetadatas, ['isParent', 'displayName'], [false, true]);

    return exits.success(inputs.docPageMetadatas);
  },
  "identity": "MarshaldocPageMetadata"
};
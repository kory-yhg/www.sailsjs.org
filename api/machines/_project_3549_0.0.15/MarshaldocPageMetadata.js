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


    // Marshal menu metadata
    inputs.docPageMetadatas = _.map(inputs.docPageMetadatas, function normalizeEachDocPage(docPage) {

      // Rename `fullPathAndFileName`
      docPage.path = docPage.fullPathAndFileName;

      // TODO: remove id and use slug instead.  For now it is set up as an alias for slug.

      // Actually just make the slug a unique string id for the doc page.
      docPage.id = docPage.slug = docPage.path.toLowerCase().replace(/[^a-z0-9]/g, '-');

      // Determine the display name-- either use the data bundled as <docmeta> tags, or
      // take the slug and make a reasonable guess based on some formatting conventions.
      docPage.displayName = docPage.data.displayName || _.startCase(docPage.slug); //slug.replace(/-/g, ' ');

      // Normalize each child in the array using the same logic we used to generate our slug
      docPage.children = _.map(docPage.children, function slugifyEachChild(child) {
        return child.toLowerCase().replace(/[^a-z0-9]/g, '-');
      });

      return docPage;
    });

    return exits.success(inputs.docPageMetadatas);
  },
  "identity": "MarshaldocPageMetadata"
};
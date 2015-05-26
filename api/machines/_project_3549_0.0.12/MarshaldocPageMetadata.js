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
        "id": "getting-started",
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
    inputs.docPageMetadatas = _.map(inputs.docPageMetadatas, function(docPage) {

      // Rename `fullPathAndFileName`
      docPage.path = docPage.fullPathAndFileName;

      // Strip off the file extension from the filename of each doc page
      // to infer the 'slug' , and lower-case it.
      docPage.id = path.basename(docPage.path, '.ejs').toLowerCase();

      // Actually just make the slug a unique string id for the doc page.
      docPage.slug = docPage.path.toLowerCase();

      // Determine the display name-- either use the data bundled as <docmeta> tags, or
      // take the slug and make a reasonable guess based on some formatting conventions.
      docPage.displayName = docPage.data.displayName || _.startCase(docPage.slug); //slug.replace(/-/g, ' ');

      return docPage;
    });

    return exits.success(inputs.docPageMetadatas);
  },
  "identity": "MarshaldocPageMetadata"
};
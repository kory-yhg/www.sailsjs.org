module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "f09f3994-de73-4499-a1e3-b55cc3467d5b",
      "friendlyName": "Doc Page Metadatas",
      "description": "",
      "example": [{
        "templateTitle": "Foo-Bar.ejs",
        "fullPathAndFileName": "creating-a-machinepack/Getting-Started.ejs",
        "data": {}
      }],
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
        "templateTitle": "Foo-Bar.ejs",
        "fullPathAndFileName": "creating-a-machinepack/Getting-Started.ejs",
        "slug": "foo-bar",
        "displayName": "Foo Bar",
        "data": {}
      }]
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var path = require('path');
    var _ = require('lodash');
    // Marshal menu metadata
    inputs.docPageMetadatas = _.map(inputs.docPageMetadatas, function(docPage) {
      // Strip off the file extension from the filename of each doc page
      // to infer the 'slug' .
      var slug = path.basename(docPage.templateTitle, '.ejs');
      docPage.slug = slug.toLowerCase();

      // Determine the display name-- either use the data bundled as <docmeta> tags, or
      // take the slug and make a reasonable guess based on some formatting conventions.
      docPage.displayName = docPage.data.displayName || slug.replace(/-/g, ' ');
      return docPage;
    });

    return exits.success(inputs.docPageMetadatas);
  },
  "identity": "MarshaldocPageMetadata"
};
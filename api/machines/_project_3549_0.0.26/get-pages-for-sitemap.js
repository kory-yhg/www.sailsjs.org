module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "27407686-6bda-4fe7-9127-3a6c892517b6",
      "friendlyName": "Doc page metadatas",
      "description": "",
      "example": [{}],
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
        "http://sailsjs.org"
      ]
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) {
    var _ = require('lodash');

    // Start off with the hard-coded pages:
    var urls = [
      'http://sailsjs.org',
      // 'http://sailsjs.org/documentation',
      'http://sailsjs.org/get-started',
      'http://sailsjs.org/features',
      'http://sailsjs.org/support',
      'http://sailsjs.org/support/about-irc',
    ];

    // Then grab the list of generated pages from the various jsmenus...
    _.each(inputs.docPageMetadatas, function(docPage) {
      var url;
      if (docPage.path.indexOf('version-notes') >= 0) {
        url = 'http://sailsjs.org/version-notes/' + docPage.displayNameSlug;
      } else url = 'http://sailsjs.org/documentation/' + docPage.slug;
      urls.push(url);
    });

    return exits.success(urls);

  },
  "identity": "get-pages-for-sitemap"
};
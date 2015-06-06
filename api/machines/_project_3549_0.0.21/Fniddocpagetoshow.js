module.exports = {
  "inputs": {
    "docPageMetadatas": {
      "id": "573ef066-9a67-49a4-9f2e-f7b91a77524f",
      "friendlyName": "docPageMetadatas",
      "description": "",
      "example": [{}],
      "required": true,
      "addedManually": true
    },
    "slug": {
      "id": "f35abb0e-6a92-4f9a-90ce-5aaf68e66653",
      "friendlyName": "slug",
      "description": "The name of the docs section you're trying to navigate to",
      "example": "dance-party",
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
      "example": {}
    },
    "notFound": {
      "friendlyName": "not found",
      "description": "",
      "example": "abc123"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) { // Ensure requested view is one of the allowed nav items.
    var docPageToShow = _.find(inputs.docPageMetadatas, function(docPage) {
      // Do a case-insensitive match and equate whitespace, %20 (URL-encoded spacebar), and dashes
      if (docPage.slug.toLowerCase().replace(/(%20|\s|-)/g, '-') === inputs.slug.toLowerCase().replace(/(%20|\s|-)/g, '-')) {
        return true;
      }
      return false;
    });


    if (!docPageToShow) {
      return exits.notFound();
    }

    return exits.success(docPageToShow)
  },
  "identity": "Fniddocpagetoshow"
};
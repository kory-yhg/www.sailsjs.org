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
      "example": {
        "path": "concepts/some-doc-page.ejs",
        "slug": "concepts/some-doc-page",
        "displayName": "Some Doc Page",
        "children": [
          "concepts/some-doc-page/child-section.ejs"
        ],
        "id": "concepts-some-doc-page",
        "parent": "concepts/0home.ejs",
        "isChild": true,
        "isParent": true,
        "displayNameSlug": "some-doc-page",
        "parentDisplayName": "--",
        "version": "0.4.6"
      }
    },
    "notFound": {
      "friendlyName": "not found",
      "description": "",
      "example": "abc123"
    },
    "redirect": {
      "friendlyName": "redirect",
      "description": "Redirect to the same page as intended, but with the correctly formatted slug. (i.e. without '.html' at the end or with the proper capitalization.)",
      "example": "idk/idk"
    }
  },
  "defaultExit": "success",
  "fn": function(inputs, exits, env) { // Strip .html off of slug, if it's there. (For old links)
    var htmlStrippedSlugInput = inputs.slug.replace(/\.html/g, '');

    if (htmlStrippedSlugInput !== inputs.slug) {
      return (exits.redirect(htmlStrippedSlugInput));
    }

    // Ensure requested view is one of the allowed nav items.
    var docPageToShow = _.find(inputs.docPageMetadatas, function(docPage) {
      // Do a case-insensitive match and equate whitespace, %20 (URL-encoded spacebar), and dashes
      if (inputs.slug.toLowerCase() === docPage.slug.toLowerCase()) {
        return true;
      }
      return false;
    });

    if (docPageToShow && docPageToShow.slug !== inputs.slug) {
      return exits.redirect(docPageToShow.slug);
    }


    if (!docPageToShow) {
      return exits.notFound();
    }



    return exits.success(docPageToShow)
  },
  "identity": "Fniddocpagetoshow"
};
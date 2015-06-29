module.exports.routes = {
  "get /old-features": {
    "target": "Old-featuresController.find"
  },
  "get /features": {
    "target": "FeaturesController.find"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /refresh": {
    "target": "RefreshController.find"
  },
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /old-homepage": {
    "target": "Old-homepageController.find"
  },
  "get /documentation/*": {
    "target": "DocumentationController.*"
  },
  "get /resources": {
    "target": "ResourcesController.find"
  },
  "get /support": {
    "target": "SupportController.find"
  },
  "get /documentation": {
    "target": "DocumentationController.find"
  },
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /version-notes/:versionnote": {
    "target": "Version-notesController.$versionnote",
    "skipAssets": true
  }
};
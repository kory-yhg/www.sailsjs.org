module.exports.routes = {
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /support": {
    "target": "SupportController.find"
  },
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /features": {
    "target": "FeaturesController.find"
  },
  "get /documentation/*": {
    "target": "DocumentationController.*"
  },
  "get /refresh": {
    "target": "RefreshController.find"
  },
  "get /documentation": {
    "target": "DocumentationController.find"
  },
  "get /version-notes/:versionnote": {
    "target": "Version-notesController.$versionnote",
    "skipAssets": true
  }
};
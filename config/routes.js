module.exports.routes = {
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /documentation/*": {
    "target": "DocumentationController.*"
  },
  "get /support": {
    "target": "SupportController.find"
  },
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /features": {
    "target": "FeaturesController.find"
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
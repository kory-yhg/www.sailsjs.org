module.exports.routes = {
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /": {
    "target": "Home$Controller.find"
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
  "get /support": {
    "target": "SupportController.find"
  },
  "get /documentation/:section": {
    "target": "DocumentationController.$section",
    "skipAssets": true
  }
};
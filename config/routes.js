module.exports.routes = {
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /documentation/concepts": {
    "target": "DocumentationController.concepts"
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
  "get /documentation/reference": {
    "target": "DocumentationController.reference"
  },
  "get /documentation": {
    "target": "DocumentationController.find"
  },
  "get /support": {
    "target": "SupportController.find"
  },
  "get /documentation/anatomy": {
    "target": "DocumentationController.anatomy"
  },
  "get /documentation/pretend/:section": {
    "target": "DocumentationController.pretend_$section",
    "skipAssets": true
  }
};
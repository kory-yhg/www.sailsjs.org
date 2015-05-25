module.exports.routes = {
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /documentation/anatomy": {
    "target": "DocumentationController.anatomy"
  },
  "get /documentation/reference": {
    "target": "DocumentationController.reference"
  },
  "get /documentation": {
    "target": "DocumentationController.find"
  },
  "get /refresh": {
    "target": "RefreshController.find"
  },
  "get /": {
    "target": "Home$Controller.find"
  },
  "get /features": {
    "target": "FeaturesController.find"
  },
  "get /support/about-irc": {
    "target": "SupportController.aboutirc"
  },
  "get /support": {
    "target": "SupportController.find"
  },
  "get /documentation/concepts": {
    "target": "DocumentationController.concepts"
  },
  "get /documentation/pretend/:section": {
    "target": "DocumentationController.pretend_$section",
    "skipAssets": true
  }
};
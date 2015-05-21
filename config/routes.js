module.exports.routes = {
  "get /documentation/anatomy": {
    "target": "DocumentationController.anatomy"
  },
  "get /documentation/reference": {
    "target": "DocumentationController.reference"
  },
  "get /documentation": {
    "target": "DocumentationController.find"
  },
  "get /documentation/concepts": {
    "target": "DocumentationController.concepts"
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
  "get /get-started": {
    "target": "Get-startedController.find"
  },
  "get /documentation/pretend/:page": {
    "target": "DocumentationController.pretend_$page",
    "skipAssets": true
  }
};
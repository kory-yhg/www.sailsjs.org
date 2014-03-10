/*---------------------
	:: Proxy
	-> controller
---------------------*/
var request = require('request');

var ProxyController = {

  // Fetch the content from the host name that we define and url path that gets passed in.
  fetch: function (req, res, next) {
    var urlPath = req.param('_escaped_fragment_');

    // If no urlPath that this request is not from a crawler.
    if (!urlPath) {
      return next();
    }

    var HOST = 'sailsjs.brombone.com';
    var url = 'http://'+HOST+'/%2523!'+urlPath;
    request(url).pipe(res);
  }
};
module.exports = ProxyController;

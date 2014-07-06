/**
 * sails.config.routes
 * @type {Object}
 */
module.exports.routes = {

  // Serve .jsmenu files with a "Content-Type: text/json" header
  'get /*.jsmenu': function (req, res, next) {
    res.type('json');
    next();
  },

	'get /': 'ProxyController.fetch',
  'get /news': 'NewsController.find',
	'get /refresh': 'RefreshController.index'
};

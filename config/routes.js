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

  // SEO
	'get /': 'ProxyController.fetch',

  // Used to populate activity bar in UI
  'get /news': 'NewsController.find',

  // Recompile the docs
	'get /refresh': 'RefreshController.index'
};

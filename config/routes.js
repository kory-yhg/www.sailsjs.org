/**
 * sails.config.routes
 * @type {Object}
 */
module.exports.routes = {

  // Redirect 'beta.sailsjs.org' to 'sailsjs.org'
  '/*': function (req, res, next) {
    try {
      if (req.subdomains[0] === 'beta') {
        return res.redirect(req.url.replace(/beta\.sailsjs\.org/, 'sailsjs.org'));
      }
    }
    catch(e) { }
    next();
  },

  // Serve .jsmenu files with a "Content-Type: text/json" header
  'get /*.jsmenu': function (req, res, next) {
    res.type('json');
    next();
  },

  // Used to populate activity bar in UI
  'get /news': 'NewsController.find',

  // Recompile the docs
	'get /refresh': 'RefreshController.index'
};

/**
 * Module dependencies
 */

var util = require('util');
var request = require('request');


module.exports = function (sails) {
  return {
    initialize: function (cb){
      return cb();
    },

    routes: {
      before: {
        'get /': function (req, res, next) {

          // For humans
          if (typeof req.param('_escaped_fragment_') !== 'string'){
            return next();
          }

          var fragment = req.param('_escaped_fragment_');

          // For search engines
          /////////////////////////////////////////////////////////
          var url = util.format('http://sailsjs.brombone.com/%23!%s', fragment);
          var r = request(url);
          r.on('error', function (err) {
            return res.serverError(err);
          });
          return r.pipe(res);
        }
      }
    }
  };
};

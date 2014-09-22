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
          if (!req.param('_escaped_fragment_')){
            return next();
          }

          // For search engines
          /////////////////////////////////////////////////////////
          var url = util.format('http://sailsjs.brombone.com/%2523!', req.param('_escaped_fragment_'));
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

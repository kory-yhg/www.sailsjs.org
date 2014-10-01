/**
 * Module dependencies
 */

var _ = require('lodash');
var Path = require('path');
var async = require('async');
var fsx = require('fs-extra');



/**
 *
 * To run, just do `node` to open the REPL, then:
 *
 * ```
 * require('./tasks/custom/prepare-html-for-google']({}, console.log)
 * ```
 *
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
module.exports = function prepare_html_for_google (options, cb) {

  options = options || {};


  // Start off with the hard-coded pages:
  var urls = [
    'http://sailsjs.org',
    'http://sailsjs.org/#!documentation',
    'http://sailsjs.org/#!getStarted',
    'http://sailsjs.org/#!features',
    'http://sailsjs.org/#!support',
  ];

  // Then grab the list of generated pages from the various jsmenus...
  async.each([
    Path.resolve(__dirname, '../../assets/templates/jsmenus/anatomy.jsmenu'),
    Path.resolve(__dirname, '../../assets/templates/jsmenus/concepts.jsmenu'),
    Path.resolve(__dirname, '../../assets/templates/jsmenus/reference.jsmenu'),
  ], function (jsmenuPath, next) {
    fsx.readJSON(jsmenuPath, function (err, jsmenu){
      if (err) return next(err);

      // Build URLs from the jsmenu
      jsmenu = _.map(jsmenu, function (jsmenuItem) {
        if (!jsmenuItem.url) {
          // build `url` from `fullPathAndFileName` if necessary
          // (trim leading slash from `jsmenuItem.fullPathAndFileName`)
          jsmenuItem.url = require('url').format({
            protocol: 'http',
            host: 'sailsjs.org',
            hash: '#!documentation/' + (jsmenuItem.realPath || jsmenuItem.fullPathAndFileName).replace(/^\/*/, '')
          });
        }
        return jsmenuItem;
      });

      // then push them onto `urls`
      urls = urls.concat(_.pluck(jsmenu, 'url'));

      next();
    });
  }, function (err) {
    if (err) return cb(err);
    return cb(null, urls);
  });
};

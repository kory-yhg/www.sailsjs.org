/**
 * Module dependencies
 */

var _ = require('lodash');
var Path = require('path');
var Hat = require('hat');
var async = require('async');
var fsx = require('fs-extra');
var PhantomJSCloud = require('machinepack-phantomjscloud');


/**
 *
 * To run, just do `sails console`, then:
 *
 * ```
 * sails.services['prepare-html-for-google']({}, console.log)
 * ```
 *
 * You'll need `sails.config.phantomjscloud.apiKey` configured in `config/local.js`.
 * Alternatively, pass in the `apiKey` option.
 *
 *
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
module.exports = function prepare_html_for_google (options, cb) {

  options = options || {};
  options.apiKey = options.apiKey || (typeof sails !== 'undefined' && sails.config.phantomjscloud.apiKey);
  if (!options.apiKey) {
    return cb(new Error('`apiKey` required'));
  }

  // Start off with the hard-coded pages:
  var urls = [
    'http://sailsjs.org',
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
          // TODO: trim leading slash from `jsmenuItem.fullPathAndFileName`
          // build `url` from `fullPathAndFileName` if necessary
          jsmenuItem.url = 'http:/sailsjs.org/#!documentation/' + (jsmenuItem.realPath || jsmenuItem.fullPathAndFileName);
        }
        return jsmenuItem;
      });

      // then push them onto `urls`
      urls = urls.concat(_.pluck(jsmenu, 'url'));

      next();
    });
  }, function (err) {
    if (err) return cb(err);

    console.log('THE FULL LIST OF URLS TO BE FETCHED:', urls);

    // Now render the pages using the hosted phantomjs instance(s)
    PhantomJSCloud.renderPages({
      apiKey: options.apiKey,
      urls: urls
    }).exec(function(err, webpages){
      if (err) return cb(err);

      console.log('Fetched pages: ',_.pluck(webpages, 'url'));
      console.log();

      // Generate an id for each webpage
      webpages = _.map(webpages, function (webpage) {
        webpage.id = Hat();
        return webpage;
      });

      // Write each webpage to disk using its unique id as its filename
      async.each(webpages, function (webpage, next){
        fsx.outputFile(Path.resolve(__dirname,'../../.tmp/phantomjscloud/'+webpage.id), webpage.html, next);
      }, function (err){
        if (err) return cb(err);

        // Finally, save the id and url of each webpage in a JSON file
        fsx.outputJSONSync(Path.resolve(__dirname,'../../.tmp/phantomjscloud/webpages.json'), {
          createdAt: new Date(),
          webpages: _.map(webpages, _.partialRight(_.pick, 'id', 'url'))
        });

      });

    });

  });


};

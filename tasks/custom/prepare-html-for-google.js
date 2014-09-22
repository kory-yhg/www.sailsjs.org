/**
 * Module dependencies
 */

var _ = require('lodash');
var Path = require('path');
var Hat = require('hat');
var async = require('async');
var Filesystem = require('machinepack-fs');
var fsx = require('fs-extra');
var generateSitemap = require('./generate-sitemap');
var PhantomJS = require('./phantomjs-renderer');



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

  // First, `rm -rf` existing cached HTML pages:
  Filesystem.rmrf({
    dir: Path.resolve(__dirname,'../../static-pages')
  }, function (err){
    if (err) return cb(err);

    // Start off with the hard-coded pages:
    var urls = [
      'http://sailsjs.org',
      'http://sailsjs.org/#!getStarted',
      'http://sailsjs.org/#!features',
      'http://sailsjs.org/#/support',
    ];

    // Then grab the list of generated pages from the various jsmenus...
    async.each([
      // Path.resolve(__dirname, '../../assets/templates/jsmenus/anatomy.jsmenu'),
      // Path.resolve(__dirname, '../../assets/templates/jsmenus/concepts.jsmenu'),
      // Path.resolve(__dirname, '../../assets/templates/jsmenus/reference.jsmenu'),
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

      console.log('THE FULL LIST OF URLS TO BE FETCHED:', urls);

      // Now render the pages
      PhantomJS.renderPages({
        urls: urls
      }, function (err, webpages) {
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
          fsx.outputFile(Path.resolve(__dirname,'../../static-pages/'+webpage.id), webpage.html, next);
        }, function (err){
          if (err) return cb(err);

          // Now save the id and url of each webpage in a JSON file
          fsx.outputJSON(Path.resolve(__dirname,'../../static-pages/webpages.json'), {
            createdAt: new Date(),
            webpages: _.map(webpages, _.partialRight(_.pick, 'id', 'url'))
          }, function (err){
            if (err) return cb(err);

            // Finally generate the sitemap
            generateSitemap({
              webpages: _.map(webpages, _.partialRight(_.pick, 'url'))
            }, function (err, sitemap) {
              if (err) return cb(err);

              // And write it to disk
              fsx.outputFile(Path.resolve(__dirname,'../../static-pages/sitemap.xml'), sitemap, cb);
            });
          });

        });

      });

    });
  });

};

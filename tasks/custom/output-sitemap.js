/**
 * Module dependencies
 */

var Path = require('path');
var fsx = require('fs-extra');
var _ = require('lodash');
var getPages = require('./get-pages');
var buildSitemapXML = require('./build-sitemap-xml');




module.exports = function outputSitemap (options, cb) {
  getPages({}, function (err, urls) {
    if (err) {
      return cb(err);
    }

    console.log(_.map(urls, function (url){ return { url: url }; }));

    buildSitemapXML({
      webpages: _.map(urls, function (url){ return { url: url }; })
    }, function (err, xml) {
      if (err) return cb(err);

      // And write it to disk
      fsx.outputFile(Path.resolve(__dirname,'../../assets/sitemap.xml'), xml, cb);
    });
  });
};

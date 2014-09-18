/**
 * Module dependencies
 */

var _ = require('lodash');





/**
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */

function generate_sitemap (options, cb){


  // Options
  var webpages = options.webpages;
  // e.g. [{url: 'http://sailsjs.org'}, {url: 'http://sailsjs.org/#!documentation/reference'}]

  // Build sitemap body, initializing w/ the XML preamble first.
  var sitemapXML = _.reduce(webpages, function (sitemapXML, webpage){

    sitemapXML +=
    '<url>' +
    '<loc>'+sanitizeURL(webpage.url)+'</loc>' +
    '<priority>'+(webpage.priority||'0.3')+'</priority>' +
    '<changefreq>daily</changefreq>' +
    '</url>';

    return sitemapXML;
  }, '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

  // Suffix
  sitemapXML += '</urlset>';

  return cb(null, sitemapXML);
}



/**
 * Convert ampersands into "&amp;"
 * (see http://stackoverflow.com/questions/3431280/validation-problem-entityref-expecting-what-should-i-do)
 *
 * @param  {String|undefined} url
 * @return {String}
 * @api private
 */

function sanitizeURL (url){
  return (url||'').replace(/\&/g,'&amp;');
}


module.exports = generate_sitemap;

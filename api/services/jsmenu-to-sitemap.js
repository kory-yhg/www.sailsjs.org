/**
 * Module dependencies
 */

var _ = require('lodash');





/**
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */

function jsmenu_to_sitemap (options, cb){

  // Options
  var jsmenu = options.data;
  var urlPrefix = options.urlPrefix;

  // For each jsmenu item:
  // build `url` from `fullPathAndFileName` if necessary
  jsmenu = _.map(jsmenu, function (jsmenuItem) {
    if (!jsmenuItem.url) {
      // TODO: trim leading slash from `jsmenuItem.fullPathAndFileName`
      jsmenuItem.url = urlPrefix + jsmenuItem.fullPathAndFileName;
    }
    return jsmenuItem;
  });


  // Build sitemap body, initializing w/ the XML preamble first.
  var sitemapXML = _.reduce(jsmenu, function (sitemapXML, jsmenuItem){

    sitemapXML +=
    '<url>' +
    '<loc>'+sanitizeURL(jsmenuItem.url)+'</loc>' +
    '<priority>'+(jsmenuItem.priority||'0.3')+'</priority>' +
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






// Temporary:
jsmenu_to_sitemap({
  urlPrefix: 'http://sailsjs.org/#!documentation/',
  data: [{
    "templateTitle": "DisablingGrunt.html",
    "fullPathAndFileName": "concepts/Assets/DisablingGrunt.html",
    "data": {
      "uniqueID": "DisablingGrunt970874",
      "displayName": "Disabling Grunt"
    },
    "parent": "concepts/Assets/Assets.html",
    "isChild": true
  }]
}, function (err, xmlSnippet){
  if (err){
    console.error('ERROR:');
    console.error(err);
    return;
  }

  console.log('RESULT:');
  console.log(xmlSnippet);
});



module.exports = jsmenu_to_sitemap;

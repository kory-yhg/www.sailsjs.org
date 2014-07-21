/**
 * Module dependencies
 */

var DocTemplater = require('doc-templater');


/**
 * Used for compiling markdown documentation into HTML templates.
 * @param  {Function} cb
 */

module.exports = function compileDocumentationMarkdown(cb) {

  // This function is applied to each template before the markdown is converted to markup
  function beforeConvert(writeFileObject, done) {
    return done(writeFileObject);
  }

  // This function is applied to each template after the markdown is converted to markup
  function afterConvert (writeFileObject, done) {

    var html = writeFileObject.templateHTML;

    // Replace github emoji with HTML
    html = html.replace(/\:white_check_mark\:/g, '<div class="replacementIcon yes"></div>');
    html = html.replace(/\:white_large_square\:/g, '<div class="replacementIcon no"></div>');
    html = html.replace(/\:heavy_multiplication_x\:/g, '<div class="replacementIcon never"></div>');

    // Replace ((bubble))s with HTML
    html = html.replace(/\(\(([^())]*)\)\)/g, '<bubble type="$1" colors="true"></bubble>');

    // Flag <h1>, <h2>, <h3>, <h4>, and <h5> tags
    // with the `permalinkable` directive
    //
    // e.g.
    // if the page is #/documentation/reference/req
    // and the slug is "transport-compatibility"
    // then the final URL will be #/documentation/reference/req?q=transport-compatibility
    var cheerio = require('cheerio');
    var $ = cheerio.load(html);
    $('h1, h2, h3, h4, h5').each(function (){
      var content = $(this).text() || '';

      // build the URL slug suffix
      var slug = content
        .replace(/[\?\!\.\-\_]/g, '') // punctuation => gone
        .replace(/\s/g, '-') // spaces => dashes
        .toLowerCase();

      // set the permalink attr
      $(this).attr('permalink', slug);
    });
    html = $.html();

    // Add target=_blank to external links
    html = html.replace(/(href="https?:\/\/[^"]+")/g, '$1 target="_blank"');

    writeFileObject.templateHTML = html;
    return done(writeFileObject);
  }

  var isLoggerEnabled = !!(typeof _ !== 'undefined' && _.contains(['verbose', 'silly'], sails.config.log.level));

  // Compile the markdown into HTML templates
  DocTemplater({
    logger: isLoggerEnabled
  })
  .build([{
    docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
    dirNameInRepo: 'reference',
    parsedTemplatesDirectory: 'assets/templates/reference/',
    applyToTemplates: {
      beforeConvert: beforeConvert,
      afterConvert: afterConvert
    },
    saveJsonMenu: 'assets/templates/jsmenus/reference.jsmenu'
  }, {

    docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
    dirNameInRepo: 'concepts',
    parsedTemplatesDirectory: 'assets/templates/concepts/',
    applyToTemplates: {
      beforeConvert: beforeConvert,
      afterConvert: afterConvert
    },
    saveJsonMenu: 'assets/templates/jsmenus/concepts.jsmenu'

  },{
    docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
    dirNameInRepo: 'anatomy',
    parsedTemplatesDirectory: 'assets/templates/anatomy/',
    applyToTemplates: {
      beforeConvert: beforeConvert,
      afterConvert: afterConvert
    },
    saveJsonMenu: 'assets/templates/jsmenus/anatomy.jsmenu'
  }, {
    docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
    dirNameInRepo: 'getting-started',
    parsedTemplatesDirectory: 'assets/templates/gettingStarted/',
    applyToTemplates: {
      beforeConvert: beforeConvert,
      afterConvert: afterConvert
    }
  }, {
    docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
    dirNameInRepo: 'support/irc',
    parsedTemplatesDirectory: 'assets/templates/irc/',
    applyToTemplates: {
      beforeConvert: beforeConvert,
      afterConvert: afterConvert
    }
  }], cb);

};

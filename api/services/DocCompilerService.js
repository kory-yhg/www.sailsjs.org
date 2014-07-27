/**
 * Module dependencies
 */


var DocTemplater = require('doc-templater');


/**
 * Used for compiling markdown documentation into HTML templates.
 * @param  {Function} cb
 */

module.exports = function compileDocumentationMarkdown(cb) {


  // This is an HTML comment because it is easy to over-match and "accidentally"
  // add it underneath each code block as well (being an HTML comment ensures it
  // doesn't show up or break anything)
  // var TMP_LANG_MARKER_EXPR = /<!-- __LANG=\%[^%]*\%__ -->/;
  var LANG_MARKER_PREFIX = '<!-- __LANG=%';
  var LANG_MARKER_SUFFIX = '%__ -->';


  // This function is applied to each template before the markdown is converted to markup
  function beforeConvert(writeFileObject, done) {

    // Disclaimer: Not actually HTML
    var mdString = writeFileObject.templateHTML;

    // Based on the github-flavored markdown's language annotation, (e.g. ```js```)
    // add a temporary marker to code blocks that can be parsed post-md-compilation
    // by the `afterConvert()` lifecycle hook
    console.log('****** ******* ******\nwriteFileObject\n\n', mdString);
    // ...
    mdString = mdString.replace(/(```)([a-zA-Z])*(\s*\n)/g, '$1\n' + LANG_MARKER_PREFIX + '$2' + LANG_MARKER_SUFFIX + '\n$3');

    // Disclaimer: Not actually HTML
    writeFileObject.templateHTML = mdString;

    return done(writeFileObject);
  }

  // This function is applied to each template after the markdown is converted to markup
  function afterConvert(writeFileObject, done) {

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
    $('h1, h2, h3, h4, h5').each(function() {
      var content = $(this).text() || '';

      // build the URL slug suffix
      var slug = content
        .replace(/[\?\!\.\-\_\:\;\'\"]/g, '') // punctuation => gone
        .replace(/\s/g, '-') // spaces => dashes
        .toLowerCase();

      // set the permalink attr
      $(this).attr('permalink', slug);

      // this was throwing ".wrap is undefined"
      if ($(this) && typeof $(this).wrap === 'function') {
        $(this).wrap('<div class="permalink-header"></div>');
      }

    });
    html = $.html();

    // Add target=_blank to external links
    html = html.replace(/(href="https?:\/\/[^"]+")/g, '$1 target="_blank"');

    // Add the appropriate `data-language` based on the temporary marker
    // (TMP_LANG_MARKER_EXPR) that was added in the `beforeConvert()` lifecycle
    // hook above

    // Interpret `js` as `javascript`
    html = html.replace(
      // $1     $2     $3   $4
      /(<code)([^>]*)(>\s*)(<!-- __LANG=\%js\%__ -->)/g,
      '$1 data-language="javascript"$2$3'
    );

    // Interpret `sh` and `bash` as `shell`
    html = html.replace(
      // $1     $2     $3   $4
      /(<code)([^>]*)(>\s*)(<!-- __LANG=\%(bash|sh)\%__ -->)/g,
      '$1 data-language="javascript"$2$3'
    );

    // When unspecified, default to `javascript`
    html = html.replace(
      // $1     $2     $3   $4
      /(<code)([^>]*)(>\s*)(<!-- __LANG=\%\%__ -->)/g,
      '$1 data-language="javascript"$2$3'
    );

    // Finally, nab the rest
    html = html.replace(
      // $1     $2     $3   $4               $5    $6
      /(<code)([^>]*)(>\s*)(<!-- __LANG=\%)([^%]+)(\%__ -->)/g,
      '$1 data-language="$5"$2$3'
    );

    // var regexReplace = codeBlock.match(/(<code[^]+?>)([^]+?<\/code>)/g,'$1$2');

    writeFileObject.templateHTML = html;
    return done(writeFileObject);
  }

  var isLoggerEnabled = !!(typeof _ !== 'undefined' && _.contains(['verbose', 'silly'], sails.config.log.level));

  // Compile the markdown into HTML templates
  DocTemplater({
    logger: isLoggerEnabled
  })
  .build([{
    remote: 'git://github.com/balderdashy/sails-docs.git',
    remoteSubPath: 'reference',
    htmlDirPath: 'assets/templates/reference/',
    jsMenuPath: 'assets/templates/jsmenus/reference.jsmenu'
    // applyToTemplates: {
    //   beforeConvert: beforeConvert,
    //   afterConvert: afterConvert
    // },

  }, {

    remote: 'git://github.com/balderdashy/sails-docs.git',
    remoteSubPath: 'concepts',
    htmlDirPath: 'assets/templates/concepts/',
    jsMenuPath: 'assets/templates/jsmenus/concepts.jsmenu'
    // applyToTemplates: {
    //   beforeConvert: beforeConvert,
    //   afterConvert: afterConvert
    // },

  }, {
    remote: 'git://github.com/balderdashy/sails-docs.git',
    remoteSubPath: 'anatomy',
    htmlDirPath: 'assets/templates/anatomy/',
    jsMenuPath: 'assets/templates/jsmenus/anatomy.jsmenu'
    // applyToTemplates: {
    //   beforeConvert: beforeConvert,
    //   afterConvert: afterConvert
    // },
  }, {
    remote: 'git://github.com/balderdashy/sails-docs.git',
    remoteSubPath: 'getting-started',
    htmlDirPath: 'assets/templates/gettingStarted/',
    // applyToTemplates: {
    //   beforeConvert: beforeConvert,
    //   afterConvert: afterConvert
    // }
  }, {
    remote: 'git://github.com/balderdashy/sails-docs.git',
    remoteSubPath: 'support/irc',
    htmlDirPath: 'assets/templates/irc/',
    // applyToTemplates: {
    //   beforeConve  rt: beforeConvert,
    //   afterConvert: afterConvert
    // }
  }], cb);

};

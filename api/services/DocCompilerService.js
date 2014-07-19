/**
 * Module dependencies
 */

var DocTemplater = require('doc-templater');



/**
 * Used for compiling markdown documentation into HTML templates.
 * @param  {Function} cb
 */

module.exports = function compileDocumentationMarkdown(cb) {

  var compiler = DocTemplater({
    logger: true
  });

  // This function is applied to each template before the markdown is converted to markup
  var beforeConvert = function(writeFileObject, done) {
    return done(writeFileObject);
  };

  // This function is applied to each template after the markdown is converted to markup
  var afterConvert = function(writeFileObject, done) {

    var html = writeFileObject.templateHTML;

    // Replace github emoji with HTML
    html = html.replace(/\:white_check_mark\:/g, '<div class="replacementIcon yes"></div>');
    html = html.replace(/\:white_large_square\:/g, '<div class="replacementIcon no"></div>');
    html = html.replace(/\:heavy_multiplication_x\:/g, '<div class="replacementIcon never"></div>');

    // Replace ((bubble))s with HTML
    html = html.replace(/\(\(([^())]*)\)\)/g, '<bubble type="$1" colors="true"></bubble>');

    writeFileObject.templateHTML = html;
    return done(writeFileObject);
  };


  compiler.build([{
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

module.exports = {

	index: function(req,res){


		var DocTemplater = require('doc-templater');
		var compiler = DocTemplater();

		var afterTemplateCB = function(err,stuff){
					if (err){
						console.log('There was at least one error bro'+err)
					} else {
						console.log('No errors.  WOOOO!');
						res.send('Sucesfull Stuff:'+JSON.stringify(stuff)+'<br>Errors:'+JSON.stringify(err))
					}
		};

		// This function is applied to each template before the markdown is converted to markup
		var beforeConvert = function(writeFileObject,cb){
			return cb(writeFileObject)

		}
		// This function is applied to each template after the markdown is converted to markup
		var afterConvert = function(writeFileObject,cb){
			//writeFileObject.templateHTML = '*|'+writeFileObject.fullPathAndFileName+'|*\n'+writeFileObject.templateHTML;
			// var JQUERY = require('jquery');
			var html = writeFileObject.templateHTML;

			//
			// Replace text nodes and add CSS class(es)
			// 

			html=html.replace(/\:white_check_mark\:/g, '<div class="replacementIcon yes"></div>');
			html=html.replace(/\:white_large_square\:/g, '<div class="replacementIcon no"></div>');
			html=html.replace(/\:heavy_multiplication_x\:/g, '<div class="replacementIcon never"></div>');

			writeFileObject.templateHTML = html;
			return cb(writeFileObject);
			// first argument can be html string, filename, or url
			// require('jsdom').env(html, function (errors, window) {
			// 	if (errors) return cb(errors);

			// 	var $ = JQUERY(window);

			// 	// $('*:contains("white_check_mark")').html('<div class="replacementIcon"></div>')
			// 	// $('*:contains("white_check_mark")').addClass('yes');
			// 	// $('td:contains("white_check_mark"),li:contains("white_check_mark")').html('');

			// 	// $('td:contains("white_large_square"),li:contains("white_large_square")').addClass('no').addClass('notyet');
			// 	// $('td:contains("white_large_square"),li:contains("white_large_square")').html('<div class="replacementIcon"></div>');

			// 	// $('td:contains("heavy_multiplication_x"),li:contains("heavy_multiplication_x")').addClass('never');
			// 	// $('td:contains("heavy_multiplication_x"),li:contains("heavy_multiplication_x")').html('<div class="replacementIcon"></div>');

			// 	// Convert transformed HTML into a string and send it back
			// 	writeFileObject.templateHTML = window.document.documentElement.outerHTML;

			// 	return cb(writeFileObject)
			// });

		};


		compiler.build([{
				docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
				dirNameInRepo: 'reference',
				parsedTemplatesDirectory: 'assets/templates/reference/',
				applyToTemplates:{
					beforeConvert: beforeConvert,
					afterConvert: afterConvert
				}
			},{
				docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
				dirNameInRepo: 'anatomy',
				parsedTemplatesDirectory: 'assets/templates/anatomy/'
			}],afterTemplateCB);

	}


}

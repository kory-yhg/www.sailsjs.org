module.exports = {

	index: function(req,res){

/*
		var childProcess = require('child_process');
		try {


			var restartWebsite = function(){
			console.log('Importing was succesfull.  Restarting Sails to see changes.  Go Grunt!!')
			sails.lower();
			process.exit(0);

			}


			refreshDocs = childProcess.exec('node parser.js', function (error, stdout, stderr) {
				if (error) {
					console.log(error.stack);
					console.log('Error code: '+error.code);
					console.log('Signal received: '+error.signal);
				} else {
					console.log('Parser Script Output: '+stdout);
				}
			});

			refreshDocs.on('exit', function (code) {
					if (code === 0){
						res.send('Everything went fabulously.  Exited with code '+code);
						setTimeout(restartWebsite,5000);
					} else {
						console.log('Things arent always perfect.  Exited with code '+code)
					}
			});

		} catch(err) {
			res.send('Uh Oh. There was an error running the parser:'+err)
		}
*/


		var templater = require('docTemplater');

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
			return cb(writeFileObject)
		};

		var parseThese = [/*{
				docsGitRepo: 'git://github.com/balderdashy/sails-docs-guides.git',
				prependPathAndName: true,
				addToSitemap: false,
				parsedTemplatesDirectory: 'assets/templates/guides/'
			},*/{
				docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
				dirNameInRepo: 'reference',
				addToSitemap: true,
				parsedTemplatesDirectory: 'assets/templates/reference/',
				applyToTemplates:{
					beforeConvert: beforeConvert,
					afterConvert: afterConvert
				}
			},{
				docsGitRepo: 'git://github.com/balderdashy/sails-docs.git',
				dirNameInRepo: 'anatomy',
				prependPathAndName: false,
				addToSitemap: true,
				parsedTemplatesDirectory: 'assets/templates/anatomy/'
			}];


		templater.createTemplate(parseThese,afterTemplateCB);

	}


}

module.exports = {

	index: function(req,res){

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




	}


}

/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req,res){
		var query = req.param('searchQuery');
		var results = {
			anatomy:[],
			reference:[],
			concepts:[]
		};

		// Escape and split words in query
		var splitQueryBySpace = query.split(' ');

		_.each(splitQueryBySpace,function(oneWord){
			  results.concepts.push({pageTitle:oneWord,pageURL:'http://www.sailsjs.org/docs/'+oneWord});
			  results.reference.push({pageTitle:oneWord,pageURL:'http://www.sailsjs.org/docs/'+oneWord});
			  results.anatomy.push({pageTitle:oneWord,pageURL:'http://www.sailsjs.org/docs/'+oneWord});
		});

		return res.json(results);
	}
};


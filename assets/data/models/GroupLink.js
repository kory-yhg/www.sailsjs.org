/**
 * Group link definition.
 */

Mast.modelDefinitions.GroupLink = Backbone.Model.extend({

	initialize: function() {
		this.generateDisplayName();
	},

    // Generate the display names based on the content of the template. Each display name is
    // determind by different things, such as content of the files and other things...
    // not sure what the othe things are.
    generateDisplayName: function() {
        var templateString = Mast.templates[this.get('url')]();

        //console.log(tName);
        var getFirstLine = templateString.match(/>[^]+?\n/)[0].replace(/[\r\t\n]/ig, '');
        var noTags = getFirstLine.replace(/<[\/]{0,1}?[^]+?>/ig,'');
        noTags = noTags.substr(1,noTags.length);

        var index = noTags.indexOf('(');

        if (index>=0)
            noTags = noTags.substr(0,index)+'()';

        index = noTags.indexOf('&lt;')

        if (index>=0)
            noTags = noTags.replace(/&lt;[^]+?&gt;/ig,'<model>');

        this.set('displayName', noTags);
    }
});


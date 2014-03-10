/**
 *
 * @region linksRegion
 * @region commentsRegion
 * @region mainContentRegion - DocsSection_reference_referenceItem
 * @region referenceLinkSection
 */
Mast.define('DocsSection_reference', function() {

	return {

		// Listen for doc reference change event and toggle the reference links
		// accordingly.
		'%docReferenceNav': function(groupName) {
            this.toggleLinks(groupName);
            this.highlightCurrentLink();
		},

		// Expand the reference links when you click on a category
		toggleLinks: function(groupName) {
            this.$('.main-section-title').removeClass('expanded');
            this.$('[data-groupName="' + groupName + '"]').toggleClass('expanded');
		},

        // Highlight the current link
        highlightCurrentLink: function() {
            var linkHash = window.location.hash;
            this.$('.reference-sidebar a').removeClass('active');
            this.$('.reference-sidebar a[href="' + linkHash + '"]').addClass('active');
        },

        //TODO: Genereate this array programatically
/*		referenceGroups: [
			'Blueprints',
			'ModelMethods',
			'CommandLine',
			'Configuration',
			'Request',
			'Response',
            'SocketClient',
            'SailsObject'
		],
*/
		afterRender: function() {
            // this.collecteReferenceGroups();
            var groups = this.groupLinks();
            this.renderGroups(groups);
		},

        /**
         * TODO: make this work!
         */
        // collecteReferenceGroups: function() {
        //     this.referenceGroups = [];

        //     for (var key in Mast.templates) {
        //         var splitHead = key.split('/');
        //         console.log(splitHead);
        //         if ($.inArray(splitHead[0], this.referenceGroups)) {
        //             // console.log(splitHead[0]);
        //             this.referenceGroups.push(splitHead[0]);
        //         }
        //         // var sectionHead = splitHead[0].split('.html')[0];
        //     }
        //     // console.log(this.referenceGroups);
        // },

		/**
		 * Group reference link groups into arrays
		 * @return {Array}
		 */
		groupLinks: function() {
			var groups = {};

      var referenceGroups = [];
      for (var s in Mast.reference)
        referenceGroups.push(s);


			// Iterate through each reference group.
//      _.each(this.referenceGroups, function(groupName) {
      _.each(referenceGroups, function(groupName) {

				groups[groupName] = [];

				// Iterate through Mast templates to find refence group keys.
				_.each(Mast.templates, function(val, templateName) {

					// If the template names contains the group name add it to the
                    // relative object.
					if (templateName.indexOf(groupName) >= 0) {
						groups[groupName].push({url: templateName});
					}
				});
			});

			return groups;
        },

        /**
         * Append a reference group component for each reference group we have.
         *
		 * @param  {Array} Array of groups that we found in Mast.templates
		 */
		renderGroups: function(groups) {
			var self = this;

			// For each group, initalize a refence group model.
			_.each(groups, function(groupLinks, groupName) {

                var overviewUrl = groupName + '/' + groupName + '.html';

                var groupModel = new Mast.modelDefinitions.ReferenceGroup({
                    groupName: groupName,
                    links: new Mast.collectionDefinitions.ReferenceLinks(groupLinks),
                    overviewUrl: overviewUrl
                });

				// Append a reference group with this collection as a property
				self.referenceLinkSection.append('ReferenceGroups', {model: groupModel})
			});
		}




		// getHead: function(template, cb) {
		// 	var getFirstLine = template.match(/>[^]+?\n/)[0].replace(/[\r\t\n]/ig, '');
  //           var noTags = getFirstLine.replace(/<[\/]{0,1}?[^]+?>/ig,'');
  //           noTags = noTags.substr(1,noTags.length);

  //           var index = noTags.indexOf('(');

  //           if (index>=0)
  //               noTags = noTags.substr(0,index)+'()';

  //           index = noTags.indexOf('&lt;')

  //           if (index>=0)
  //               noTags = noTags.replace(/&lt;[^]+?&gt;/ig,'<model>');

  //           return cb(noTags);
		// },
	};
});

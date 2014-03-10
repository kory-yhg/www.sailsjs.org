/**
 * Docs reference links section
 *
 * @region linksRegionLink
 */

//TODO:
//When there are no StackOverflow links: $('.link-section').addClass('empty')
//Also, when error msg is visible, and then a link is succesfully submitted:
//$('.link-section').removeClass('error');

Mast.define ('DocsSection_reference_linkSection', function() {
	return {

        // Empty the region and get the new links associated with this view.
        '%renderStackOverflowLinks': function() {
            this.linksRegionLink.empty();
            this.getAssociatedLinks(this.renderAllLinks);
        },

        events: {
            'click .add-button': 'addLink'
        },


		afterRender: function() {
            this.getAssociatedLinks(this.renderAllLinks);
		},

        /**
         * Create a new link for this unique page and render it.
         */
        addLink: function() {
            var self = this,
                pageName = Mast.models.App.get('docReferencePage'),
                url = this.$('.add-link-input').val().trim();

            if (!this.isValidUrl(url)) {
                $('.link-section').addClass('error');
                return;
            }

            // Create a new link for this page.
            $.post('/page/' + pageName + '/links', {
                url: url,
                page: pageName
            }, function(data) {

                // Add to collection and render the new link.
                var model = Mast.collections.StackOverflowLinks.add(data);
                self.linksRegionLink.append('DocsSection_reference_linkSection_link', {
                    model: model
                });
            });

            // Clear the input.
            url = this.$('.add-link-input').val('');
        },

        /**
         * We use this to validate if the url is form stackoverflow.com
         * This is just a simple validation, we probably need something more robust then this.
         *
         * @param  {String} url [Url we want to validate against]
         *
         * @return {Boolean}    [If the url is valid or not]
         */
        isValidUrl: function(url) {
            return url.indexOf('stackoverflow.com') >= 0;
        },

        /**
         * Render all links, this will be run when the collection is initially is fetched.
         *
         * @param  {Collection} collection [Collection that we want to render]
         */
        renderAllLinks: function(collection) {

            // Error in the response
            if (collection.error) {
                this.$el.addClass('server-error');
                return;
            }

            // No items returned.
            else if(collection.length === 0) {
                this.$el.addClass('empty');
                return;
            }

            // Render the links.
            else {
                collection.each(function(link) {
                    this.linksRegionLink.append('DocsSection_reference_linkSection_link', {
                        model: link
                    });
                }, this);
            }

        },

        /**
         * Get the associated links with the current docs reference page.
         * We will generate a dynamic url and then fetch the resources that location.
         *
         * @param  {Function} cb [Callback function run on fetch success]
         */
        getAssociatedLinks: function(cb) {
            // var pageName = Mast.models.App.get('docReferencePage')
            // this.collection = new Mast.collectionDefinitions.StackOverflowLinks();
            // this.collection.url = function() {
            //     return  '/page/' + pageName + '/links';
            // }
            // this.collection.fetch({
            //     success: function(collection) {
            //         cb(collection);
            //     },
            //     error: function(collection) {
            //         collection.error = true;
            //         cb(collection);
            //     }
            // });
        }

	};
});

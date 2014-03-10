/**
 * @region [groupLinks] Where links for the reference group will be appended.
 */

Mast.define('ReferenceGroups', function() {
	return {

		afterRender: function() {
			var self = this,
                groupLinks = this.model.get('links');

			// Append a Reference link for each model in the collection.
			groupLinks.each(function(model) {
				self.groupLinks.append('ReferenceLink', {model: model});
			});
		}
	};
});

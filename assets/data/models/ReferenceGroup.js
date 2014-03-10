/**
 * Group link definition.
 */

Mast.modelDefinitions.ReferenceGroup = Backbone.Model.extend({

    initialize: function() {
        this.generateDisplayName();
        this.removeOverviewLink();
    },

    /**
     * Remove the link from the links collection that is the overview link. For now the
     * convention is for the overview page to be the same as the group name.
     * (eg. Blueprints group removes Blueprints link);
     */
    removeOverviewLink: function() {
        var self = this,
            links = this.get('links');

        var overviewModel = links.findWhere({displayName: this.get('displayName')});
        links.remove(overviewModel);
    },

    generateDisplayName: function() {
        var formattedName = this.get('groupName').replace(/([a-z])([A-Z])/g, '$1 $2');
        this.set('displayName', formattedName);

    }

});

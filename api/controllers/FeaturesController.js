var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "features",
                    data: {
                        title: "Features | Sails.js",
                        description: "Sails is a lightweight framework that sits on top of Express. Its ensemble of small modules work together to provide simplicity, maintainability, and structural conventions to Node.js apps."
                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};
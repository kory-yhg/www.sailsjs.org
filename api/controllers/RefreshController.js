var Machine = require("machine");
module.exports = {
    find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Compile markdown docs
                sails.machines['_project_3549_0.0.6'].Compilemarkdowndocs({
                    "path": "reference"
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "error": function(compileMarkdownDocs) {
                        return exits.error({
                            data: compileMarkdownDocs,
                            status: 500
                        });

                    },
                    "success": function(compileMarkdownDocs) {
                        // Compile markdown docs
                        sails.machines['_project_3549_0.0.6'].Compilemarkdowndocs({
                            "path": "anatomy"
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "error": function(compileMarkdownDocs2) {
                                return exits.error({
                                    data: compileMarkdownDocs2,
                                    status: 500
                                });

                            },
                            "success": function(compileMarkdownDocs2) {
                                // Compile markdown docs
                                sails.machines['_project_3549_0.0.6'].Compilemarkdowndocs({
                                    "path": "concepts"
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "error": function(compileMarkdownDocs3) {
                                        return exits.error({
                                            data: compileMarkdownDocs3,
                                            status: 500
                                        });

                                    },
                                    "success": function(compileMarkdownDocs3) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: 200
                                        });

                                    }
                                });

                            }
                        });

                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};
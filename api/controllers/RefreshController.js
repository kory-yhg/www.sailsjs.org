var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Compile reference docs
                sails.machines['_project_3549_0.0.21'].Compilemarkdowndocs({
                    "path": "reference"
                }).setEnvironment({
                    sails: sails
                }).exec({
                    "error": function(compileReferenceDocs) {
                        return exits.error({
                            data: compileReferenceDocs,
                            status: 500
                        });

                    },
                    "success": function(compileReferenceDocs) {
                        // Compile anatomy docs
                        sails.machines['_project_3549_0.0.21'].Compilemarkdowndocs({
                            "path": "anatomy"
                        }).setEnvironment({
                            sails: sails
                        }).exec({
                            "error": function(compileAnatomyDocs) {
                                return exits.error({
                                    data: compileAnatomyDocs,
                                    status: 500
                                });

                            },
                            "success": function(compileAnatomyDocs) {
                                // Compile concepts docs
                                sails.machines['_project_3549_0.0.21'].Compilemarkdowndocs({
                                    "path": "concepts"
                                }).setEnvironment({
                                    sails: sails
                                }).exec({
                                    "error": function(compileConceptsDocs) {
                                        return exits.error({
                                            data: compileConceptsDocs,
                                            status: 500
                                        });

                                    },
                                    "success": function(compileConceptsDocs) {
                                        // Compile getting started docs
                                        sails.machines['_project_3549_0.0.21'].Compilemarkdowndocs({
                                            "path": "getting-started"
                                        }).setEnvironment({
                                            sails: sails
                                        }).exec({
                                            "error": function(compileGettingStartedDocs) {
                                                return exits.error({
                                                    data: compileGettingStartedDocs,
                                                    status: 500
                                                });

                                            },
                                            "success": function(compileGettingStartedDocs) {
                                                // Compile irc docs
                                                sails.machines['_project_3549_0.0.21'].Compilemarkdowndocs({
                                                    "path": "support/irc"
                                                }).setEnvironment({
                                                    sails: sails
                                                }).exec({
                                                    "error": function(compileIrcDocs) {
                                                        return exits.error({
                                                            data: compileIrcDocs,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(compileIrcDocs) {
                                                        // Compile version notes
                                                        sails.machines['_project_3549_0.0.21'].Compilemarkdowndocs({
                                                            "path": "version-notes"
                                                        }).setEnvironment({
                                                            sails: sails
                                                        }).exec({
                                                            "error": function(compileVersionNotes) {
                                                                return exits.error({
                                                                    data: compileVersionNotes,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(compileVersionNotes) {
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
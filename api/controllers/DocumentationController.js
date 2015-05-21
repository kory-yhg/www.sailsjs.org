var Machine = require("machine");
module.exports = {
    pretend_$page: function(req, res) {
        Machine.build({
            inputs: {
                "page": {
                    "example": "abc123",
                    "required": true
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Resolve path
                sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                    "paths": ["views/partials/dummy-docs/docs.jsmenu"]
                }).exec({
                    "error": function(resolvePath) {
                        return exits.error({
                            data: resolvePath,
                            status: 500
                        });

                    },
                    "success": function(resolvePath) {
                        // Read JSON file
                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_4.0.0'].readJson({
                            "source": resolvePath,
                            "schema": [{
                                templateTitle: "Foo-Bar.ejs",
                                fullPathAndFileName: "creating-a-machinepack/Getting-Started.ejs",
                                data: {}
                            }]
                        }).exec({
                            "error": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "doesNotExist": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "couldNotParse": function(readJSONFile) {
                                return exits.error({
                                    data: readJSONFile,
                                    status: 500
                                });

                            },
                            "success": function(readJSONFile) {
                                // Marshal menu metadata
                                sails.machines['_project_3549_0.0.5'].MarshaldocPageMetadata({
                                    "docPageMetadatas": readJSONFile
                                }).setEnvironment({
                                    req: req,
                                    res: res,
                                    sails: sails
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.error({
                                            data: marshalMenuMetadata,
                                            status: 500
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        // Find doc template to show
                                        sails.machines['_project_3549_0.0.5'].Fniddocpagetoshow({
                                            "docPageMetadatas": marshalMenuMetadata,
                                            "slug": inputs.page
                                        }).setEnvironment({
                                            req: req,
                                            res: res,
                                            sails: sails
                                        }).exec({
                                            "error": function(findDocTemplateToShow) {
                                                return exits.error({
                                                    data: findDocTemplateToShow,
                                                    status: 500
                                                });

                                            },
                                            "success": function(findDocTemplateToShow) {
                                                return exits.respond({
                                                    data: {
                                                        templateList: marshalMenuMetadata,
                                                        currentTemplate: findDocTemplateToShow,
                                                        sectionTitle: "Pretend Docs"
                                                    },
                                                    action: "display_view",
                                                    status: 200,
                                                    view: "docs/pretend"
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
    },
    anatomy: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "docs/anatomy",
                    data: {
                        sectionTitle: "Anatomy of a Sails App"
                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    reference: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "docs/reference",
                    data: {
                        sectionTitle: "Reference"
                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "redirect",
                    status: 200,
                    data: "/documentation/concepts"
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    concepts: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                return exits.respond({
                    action: "display_view",
                    status: 200,
                    view: "docs/concepts",
                    data: {
                        sectionTitle: "Concepts"
                    }
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};
var Machine = require("machine");
module.exports = {
    $section: function(req, res) {
        Machine.build({
            inputs: {
                "section": {
                    "example": "abc123",
                    "required": true
                },
                "section": {
                    "example": "/usr/local/lib/node_modules",
                    "required": true
                },
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
                    "paths": ["views/partials/doc-menus/" + inputs.section + ".jsmenu"]
                }).exec({
                    "error": function(resolvePath) {
                        return exits.error({
                            data: resolvePath,
                            status: 500
                        });

                    },
                    "success": function(resolvePath) {
                        // Read JSON file
                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                            "source": resolvePath,
                            "schema": [{
                                templateTitle: "Foo-Bar.ejs",
                                fullPathAndFileName: "creating-a-machinepack/Getting-Started.ejs",
                                data: {},
                                children: ["some/pat"],
                                isChild: true,
                                isParent: true,
                                parent: "creating-a-machinepack"
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
                                sails.machines['_project_3549_0.0.12'].MarshaldocPageMetadata({
                                    "docPageMetadatas": readJSONFile
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.respond({
                                            action: "respond_with_status",
                                            status: "501"
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        // Find doc template to show
                                        sails.machines['_project_3549_0.0.12'].Fniddocpagetoshow({
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
                                                // Construct dictionary
                                                sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                    "dictionary": {
                                                        templateList: marshalMenuMetadata,
                                                        currentTemplate: findDocTemplateToShow
                                                    }
                                                }).exec({
                                                    "error": function(constructDictionary) {
                                                        return exits.error({
                                                            data: constructDictionary,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(constructDictionary) {
                                                        // If equal (===)
                                                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                            "a": inputs.section,
                                                            "b": "anatomy"
                                                        }).exec({
                                                            "error": function(ifEqual) {
                                                                return exits.error({
                                                                    data: ifEqual,
                                                                    status: "505"
                                                                });

                                                            },
                                                            "otherwise": function(ifEqual) {
                                                                return exits.respond({
                                                                    data: {
                                                                        sectionTitle: inputs.section,
                                                                        data: constructDictionary
                                                                    },
                                                                    action: "display_view",
                                                                    status: 500,
                                                                    view: "docs/reference-or-concepts"
                                                                });

                                                            },
                                                            "success": function(ifEqual) {
                                                                return exits.respond({
                                                                    data: {
                                                                        sectionTitle: "Anatomy of a Sails App",
                                                                        data: constructDictionary
                                                                    },
                                                                    action: "display_view",
                                                                    status: 200,
                                                                    view: "docs/anatomy"
                                                                });

                                                            }
                                                        });

                                                    }
                                                });

                                            },
                                            "notFound": function(findDocTemplateToShow) {
                                                return exits.error({
                                                    data: findDocTemplateToShow,
                                                    status: 500
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
    }
};
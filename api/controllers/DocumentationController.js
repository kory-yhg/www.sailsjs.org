var Machine = require("machine");
module.exports = {
    '$section': function(req, res) {
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
                    "example": "abc123"
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
                                data: {
                                    uniqueID: "idk1234",
                                    displayName: "Foo Bar"
                                },
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
                                sails.machines['_project_3549_0.0.17'].MarshaldocPageMetadata({
                                    "docPageMetadatas": readJSONFile
                                }).exec({
                                    "error": function(marshalMenuMetadata) {
                                        return exits.error({
                                            data: marshalMenuMetadata,
                                            status: 500
                                        });

                                    },
                                    "success": function(marshalMenuMetadata) {
                                        // If defined
                                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifDefined({
                                            "value": inputs.page
                                        }).exec({
                                            "error": function(ifDefined) {
                                                return exits.error({
                                                    data: ifDefined,
                                                    status: 500
                                                });

                                            },
                                            "otherwise": function(ifDefined) {
                                                // If section === 'anatomy'
                                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                    "a": inputs.section,
                                                    "b": "anatomy"
                                                }).exec({
                                                    "error": function(ifSectionAnatomy2) {
                                                        return exits.error({
                                                            data: ifSectionAnatomy2,
                                                            status: 500
                                                        });

                                                    },
                                                    "otherwise": function(ifSectionAnatomy2) {
                                                        // If section === 'reference'
                                                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                            "a": inputs.section,
                                                            "b": "reference"
                                                        }).exec({
                                                            "error": function(ifSectionReference) {
                                                                return exits.error({
                                                                    data: ifSectionReference,
                                                                    status: 500
                                                                });

                                                            },
                                                            "otherwise": function(ifSectionReference) {
                                                                return exits.respond({
                                                                    data: "/documentation/concepts?page=concepts/0home/0home.ejs",
                                                                    action: "redirect",
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(ifSectionReference) {
                                                                return exits.respond({
                                                                    data: "/documentation/reference?page=reference/0home/0home.ejs",
                                                                    action: "redirect",
                                                                    status: 200
                                                                });

                                                            }
                                                        });

                                                    },
                                                    "success": function(ifSectionAnatomy2) {
                                                        return exits.respond({
                                                            data: "/documentation/anatomy?page=anatomy/myapp/myapp.ejs",
                                                            action: "redirect",
                                                            status: 200
                                                        });

                                                    }
                                                });

                                            },
                                            "success": function(ifDefined) {
                                                // Find doc template to show
                                                sails.machines['_project_3549_0.0.17'].Fniddocpagetoshow({
                                                    "docPageMetadatas": marshalMenuMetadata,
                                                    "slug": ifDefined
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
                                                                currentTemplate: findDocTemplateToShow,
                                                                section: inputs.section
                                                            }
                                                        }).exec({
                                                            "error": function(constructDictionary) {
                                                                return exits.error({
                                                                    data: constructDictionary,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(constructDictionary) {
                                                                // If section === 'anatomy'
                                                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                                    "a": inputs.section,
                                                                    "b": "anatomy"
                                                                }).exec({
                                                                    "error": function(ifSectionAnatomy) {
                                                                        return exits.error({
                                                                            data: ifSectionAnatomy,
                                                                            status: "505"
                                                                        });

                                                                    },
                                                                    "otherwise": function(ifSectionAnatomy) {
                                                                        // Capitalize a string
                                                                        sails.machines['03558d7e-53ad-4e20-b03f-ddd54c34ce3c_4.0.0'].capitalize({
                                                                            "string": inputs.section
                                                                        }).exec({
                                                                            "error": function(capitalizeAString) {
                                                                                return exits.error({
                                                                                    data: capitalizeAString,
                                                                                    status: "505"
                                                                                });

                                                                            },
                                                                            "success": function(capitalizeAString) {
                                                                                return exits.respond({
                                                                                    data: {
                                                                                        sectionTitle: capitalizeAString,
                                                                                        data: constructDictionary
                                                                                    },
                                                                                    action: "display_view",
                                                                                    status: 200,
                                                                                    view: "docs/reference-or-concepts"
                                                                                });

                                                                            }
                                                                        });

                                                                    },
                                                                    "success": function(ifSectionAnatomy) {
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
                                                        return exits.respond({
                                                            data: "/documentation/" + inputs.section,
                                                            action: "redirect",
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
                });
            }
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    },
    'find': function(req, res) {
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
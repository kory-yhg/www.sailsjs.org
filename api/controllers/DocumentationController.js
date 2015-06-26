var Machine = require("machine");
module.exports = {
    '*': function(req, res) {
        Machine.build({
            inputs: {
                "*": {
                    "example": "abc123",
                    "required": true
                },
                "q": {
                    "example": "task-configuration"
                }
            },
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Split using regexp
                sails.machines['03558d7e-53ad-4e20-b03f-ddd54c34ce3c_4.0.0'].split({
                    "string": inputs['*'],
                    "regexp": "/"
                }).exec({
                    "error": function(splitUsingRegexp) {
                        return exits.error({
                            data: splitUsingRegexp,
                            status: "505"
                        });

                    },
                    "invalidRegexp": function(splitUsingRegexp) {
                        return exits.error({
                            data: splitUsingRegexp,
                            status: "504"
                        });

                    },
                    "success": function(splitUsingRegexp) {
                        // Get [n]th item
                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].nth({
                            "array": splitUsingRegexp,
                            "index": 0
                        }).exec({
                            "error": function(getNThItem) {
                                return exits.error({
                                    data: getNThItem,
                                    status: 500
                                });

                            },
                            "notFound": function(getNThItem) {
                                return exits.error({
                                    data: getNThItem,
                                    status: 500
                                });

                            },
                            "success": function(getNThItem) {
                                // Lowercase a string
                                sails.machines['03558d7e-53ad-4e20-b03f-ddd54c34ce3c_4.0.0'].lowerCase({
                                    "string": getNThItem
                                }).exec({
                                    "error": function(lowercaseAString) {
                                        return exits.error({
                                            data: lowercaseAString,
                                            status: 500
                                        });

                                    },
                                    "success": function(lowercaseAString) {
                                        // Resolve path
                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                                            "paths": ["views/partials/doc-menus/" + lowercaseAString + ".jsmenu"]
                                        }).exec({
                                            "error": function(resolvePath) {
                                                return exits.error({
                                                    data: resolvePath,
                                                    status: "502"
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
                                                            status: "501"
                                                        });

                                                    },
                                                    "doesNotExist": function(readJSONFile) {
                                                        return exits.respond({
                                                            data: "/documentation/concepts",
                                                            action: "redirect",
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
                                                        sails.machines['_project_3549_0.0.26'].MarshaldocPageMetadata({
                                                            "docPageMetadatas": readJSONFile
                                                        }).exec({
                                                            "error": function(marshalMenuMetadata) {
                                                                return exits.error({
                                                                    data: marshalMenuMetadata,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(marshalMenuMetadata) {
                                                                // Is it an old link?
                                                                sails.machines['_project_3549_0.0.26'].isItAnOldLink({
                                                                    "docPageMetadatas": marshalMenuMetadata,
                                                                    "slug": inputs['*'],
                                                                    "q": inputs.q
                                                                }).setEnvironment({
                                                                    req: req,
                                                                    res: res,
                                                                    sails: sails
                                                                }).exec({
                                                                    "error": function(isItAnOldLink) {
                                                                        return exits.error({
                                                                            data: isItAnOldLink,
                                                                            status: "499"
                                                                        });

                                                                    },
                                                                    "success": function(isItAnOldLink) {
                                                                        // Find doc template to show
                                                                        sails.machines['_project_3549_0.0.26'].Fniddocpagetoshow({
                                                                            "docPageMetadatas": marshalMenuMetadata,
                                                                            "slug": inputs['*']
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
                                                                                // List expanded menu items
                                                                                sails.machines['_project_3549_0.0.26'].Findparent({
                                                                                    "menuData": marshalMenuMetadata,
                                                                                    "path": (findDocTemplateToShow && findDocTemplateToShow.path)
                                                                                }).setEnvironment({
                                                                                    req: req,
                                                                                    res: res,
                                                                                    sails: sails
                                                                                }).exec({
                                                                                    "error": function(listExpandedMenuItems) {
                                                                                        return exits.error({
                                                                                            data: listExpandedMenuItems,
                                                                                            status: 500
                                                                                        });

                                                                                    },
                                                                                    "success": function(listExpandedMenuItems) {
                                                                                        // Construct dictionary
                                                                                        sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                            "dictionary": {
                                                                                                templateList: marshalMenuMetadata,
                                                                                                currentTemplate: findDocTemplateToShow,
                                                                                                section: getNThItem,
                                                                                                expandedItems: listExpandedMenuItems
                                                                                            }
                                                                                        }).exec({
                                                                                            "error": function(constructDictionary) {
                                                                                                return exits.error({
                                                                                                    data: constructDictionary,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(constructDictionary) {
                                                                                                // If it's an 'Anatomy' page
                                                                                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                                                                    "a": lowercaseAString,
                                                                                                    "b": "anatomy"
                                                                                                }).exec({
                                                                                                    "error": function(ifItSAnAnatomyPage) {
                                                                                                        return exits.error({
                                                                                                            data: ifItSAnAnatomyPage,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "otherwise": function(ifItSAnAnatomyPage) {
                                                                                                        // Capitalize a string
                                                                                                        sails.machines['03558d7e-53ad-4e20-b03f-ddd54c34ce3c_4.0.0'].capitalize({
                                                                                                            "string": getNThItem
                                                                                                        }).exec({
                                                                                                            "error": function(capitalizeAString) {
                                                                                                                return exits.error({
                                                                                                                    data: capitalizeAString,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "success": function(capitalizeAString) {
                                                                                                                return exits.respond({
                                                                                                                    data: {
                                                                                                                        sectionTitle: capitalizeAString,
                                                                                                                        data: constructDictionary,
                                                                                                                        title: (constructDictionary && constructDictionary.currentTemplate.displayName) + " | Sails.js Documentation"
                                                                                                                    },
                                                                                                                    action: "display_view",
                                                                                                                    status: 200,
                                                                                                                    view: "docs/reference-or-concepts"
                                                                                                                });

                                                                                                            }
                                                                                                        });

                                                                                                    },
                                                                                                    "success": function(ifItSAnAnatomyPage) {
                                                                                                        return exits.respond({
                                                                                                            data: {
                                                                                                                sectionTitle: "Anatomy of a Sails App",
                                                                                                                data: constructDictionary,
                                                                                                                title: "Anatomy of a Sails App | Sails.js Documentation",
                                                                                                                description: "An interactive tutorial of a Sails.js app's structure. Explore the files and folders that are generated when you create a new Sails app, and learn the purpose and usage of each one."
                                                                                                            },
                                                                                                            action: "display_view",
                                                                                                            status: 200,
                                                                                                            view: "docs/anatomy"
                                                                                                        });

                                                                                                    }
                                                                                                });

                                                                                            }
                                                                                        });

                                                                                    }
                                                                                });

                                                                            },
                                                                            "notFound": function(findDocTemplateToShow) {
                                                                                // If equal (===) to anatomy
                                                                                sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                                                    "a": getNThItem,
                                                                                    "b": "anatomy"
                                                                                }).exec({
                                                                                    "error": function(ifEqualToAnatomy) {
                                                                                        return exits.error({
                                                                                            data: ifEqualToAnatomy,
                                                                                            status: 500
                                                                                        });

                                                                                    },
                                                                                    "otherwise": function(ifEqualToAnatomy) {
                                                                                        // If equal (===) to reference
                                                                                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifEqual({
                                                                                            "a": getNThItem,
                                                                                            "b": "reference"
                                                                                        }).exec({
                                                                                            "error": function(ifEqualToReference) {
                                                                                                return exits.error({
                                                                                                    data: ifEqualToReference,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "otherwise": function(ifEqualToReference) {
                                                                                                return exits.respond({
                                                                                                    data: "/documentation/concepts/",
                                                                                                    action: "redirect",
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(ifEqualToReference) {
                                                                                                return exits.respond({
                                                                                                    data: "/documentation/reference/",
                                                                                                    action: "redirect",
                                                                                                    status: 200
                                                                                                });

                                                                                            }
                                                                                        });

                                                                                    },
                                                                                    "success": function(ifEqualToAnatomy) {
                                                                                        return exits.respond({
                                                                                            data: "/documentation/anatomy/my-app",
                                                                                            action: "redirect",
                                                                                            status: 200
                                                                                        });

                                                                                    }
                                                                                });

                                                                            }
                                                                        });

                                                                    },
                                                                    "oldLink": function(isItAnOldLink) {
                                                                        return exits.respond({
                                                                            data: "/documentation/" + isItAnOldLink,
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
                        });

                    }
                });
            }
        }).configure(sails.util.extend(req.params.all(), {
            '*': req.param('0')
        }), {
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
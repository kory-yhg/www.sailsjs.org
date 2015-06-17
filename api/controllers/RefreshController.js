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
                sails.machines['_project_3549_0.0.26'].Compilemarkdowndocs({
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
                        sails.machines['_project_3549_0.0.26'].Compilemarkdowndocs({
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
                                sails.machines['_project_3549_0.0.26'].Compilemarkdowndocs({
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
                                        sails.machines['_project_3549_0.0.26'].Compilemarkdowndocs({
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
                                                sails.machines['_project_3549_0.0.26'].Compilemarkdowndocs({
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
                                                        sails.machines['_project_3549_0.0.26'].Compilemarkdowndocs({
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
                                                                // Resolve path
                                                                sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                                                                    "paths": ["views/partials/doc-menus/" + "anatomy" + ".jsmenu"]
                                                                }).exec({
                                                                    "error": function(resolvePath2) {
                                                                        return exits.error({
                                                                            data: resolvePath2,
                                                                            status: 500
                                                                        });

                                                                    },
                                                                    "success": function(resolvePath2) {
                                                                        // Read JSON file
                                                                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                                                                            "source": resolvePath2,
                                                                            "schema": [{
                                                                                templateTitle: "Foo-Bar.ejs",
                                                                                fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                data: {
                                                                                    displayName: "Foo Bar"
                                                                                },
                                                                                children: ["idk/foo-bar/something.ejs"],
                                                                                isChild: true,
                                                                                isParent: true,
                                                                                parent: "idk.ejs"
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
                                                                                        // Resolve path
                                                                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                                                                                            "paths": ["views/partials/doc-menus/" + "concepts" + ".jsmenu"]
                                                                                        }).exec({
                                                                                            "error": function(resolvePath3) {
                                                                                                return exits.error({
                                                                                                    data: resolvePath3,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(resolvePath3) {
                                                                                                // Read JSON file
                                                                                                sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                                                                                                    "source": resolvePath3,
                                                                                                    "schema": [{
                                                                                                        templateTitle: "Foo-Bar.ejs",
                                                                                                        fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                        data: {
                                                                                                            displayName: "Foo Bar"
                                                                                                        },
                                                                                                        children: ["idk/foo-bar/something.ejs"],
                                                                                                        isChild: true,
                                                                                                        isParent: true,
                                                                                                        parent: "idk.ejs"
                                                                                                    }]
                                                                                                }).exec({
                                                                                                    "error": function(readJSONFile2) {
                                                                                                        return exits.error({
                                                                                                            data: readJSONFile2,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "doesNotExist": function(readJSONFile2) {
                                                                                                        return exits.error({
                                                                                                            data: readJSONFile2,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "couldNotParse": function(readJSONFile2) {
                                                                                                        return exits.error({
                                                                                                            data: readJSONFile2,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "success": function(readJSONFile2) {
                                                                                                        // Marshal menu metadata
                                                                                                        sails.machines['_project_3549_0.0.26'].MarshaldocPageMetadata({
                                                                                                            "docPageMetadatas": readJSONFile2
                                                                                                        }).exec({
                                                                                                            "error": function(marshalMenuMetadata2) {
                                                                                                                return exits.error({
                                                                                                                    data: marshalMenuMetadata2,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "success": function(marshalMenuMetadata2) {
                                                                                                                // Combine anatomy and concepts arrays
                                                                                                                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].concat({
                                                                                                                    "firstArray": marshalMenuMetadata,
                                                                                                                    "secondArray": marshalMenuMetadata2
                                                                                                                }).exec({
                                                                                                                    "error": function(combineAnatomyAndConceptsArrays) {
                                                                                                                        return exits.error({
                                                                                                                            data: combineAnatomyAndConceptsArrays,
                                                                                                                            status: 500
                                                                                                                        });

                                                                                                                    },
                                                                                                                    "success": function(combineAnatomyAndConceptsArrays) {
                                                                                                                        // Resolve path
                                                                                                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                                                                                                                            "paths": ["views/partials/doc-menus/" + "reference" + ".jsmenu"]
                                                                                                                        }).exec({
                                                                                                                            "error": function(resolvePath4) {
                                                                                                                                return exits.error({
                                                                                                                                    data: resolvePath4,
                                                                                                                                    status: 500
                                                                                                                                });

                                                                                                                            },
                                                                                                                            "success": function(resolvePath4) {
                                                                                                                                // Read JSON file
                                                                                                                                sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                                                                                                                                    "source": resolvePath4,
                                                                                                                                    "schema": [{
                                                                                                                                        templateTitle: "Foo-Bar.ejs",
                                                                                                                                        fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                                                        data: {
                                                                                                                                            displayName: "Foo Bar"
                                                                                                                                        },
                                                                                                                                        children: ["idk/foo-bar/something.ejs"],
                                                                                                                                        isChild: true,
                                                                                                                                        isParent: true,
                                                                                                                                        parent: "idk.ejs"
                                                                                                                                    }]
                                                                                                                                }).exec({
                                                                                                                                    "error": function(readJSONFile3) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: readJSONFile3,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "doesNotExist": function(readJSONFile3) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: readJSONFile3,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "couldNotParse": function(readJSONFile3) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: readJSONFile3,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "success": function(readJSONFile3) {
                                                                                                                                        // Marshal menu metadata
                                                                                                                                        sails.machines['_project_3549_0.0.26'].MarshaldocPageMetadata({
                                                                                                                                            "docPageMetadatas": readJSONFile3
                                                                                                                                        }).exec({
                                                                                                                                            "error": function(marshalMenuMetadata3) {
                                                                                                                                                return exits.error({
                                                                                                                                                    data: marshalMenuMetadata3,
                                                                                                                                                    status: 500
                                                                                                                                                });

                                                                                                                                            },
                                                                                                                                            "success": function(marshalMenuMetadata3) {
                                                                                                                                                // Resolve path
                                                                                                                                                sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                                                                                                                                                    "paths": ["views/partials/doc-menus/" + "version-notes" + ".jsmenu"]
                                                                                                                                                }).exec({
                                                                                                                                                    "error": function(resolvePath5) {
                                                                                                                                                        return exits.error({
                                                                                                                                                            data: resolvePath5,
                                                                                                                                                            status: 500
                                                                                                                                                        });

                                                                                                                                                    },
                                                                                                                                                    "success": function(resolvePath5) {
                                                                                                                                                        // Read JSON file
                                                                                                                                                        sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].readJson({
                                                                                                                                                            "source": resolvePath5,
                                                                                                                                                            "schema": [{
                                                                                                                                                                templateTitle: "Foo-Bar.ejs",
                                                                                                                                                                fullPathAndFileName: "idk/foo-bar.ejs",
                                                                                                                                                                data: {
                                                                                                                                                                    displayName: "Foo Bar"
                                                                                                                                                                },
                                                                                                                                                                children: ["idk/foo-bar/something.ejs"],
                                                                                                                                                                isChild: true,
                                                                                                                                                                isParent: true,
                                                                                                                                                                parent: "idk.ejs"
                                                                                                                                                            }]
                                                                                                                                                        }).exec({
                                                                                                                                                            "error": function(readJSONFile4) {
                                                                                                                                                                return exits.error({
                                                                                                                                                                    data: readJSONFile4,
                                                                                                                                                                    status: 500
                                                                                                                                                                });

                                                                                                                                                            },
                                                                                                                                                            "doesNotExist": function(readJSONFile4) {
                                                                                                                                                                return exits.error({
                                                                                                                                                                    data: readJSONFile4,
                                                                                                                                                                    status: 500
                                                                                                                                                                });

                                                                                                                                                            },
                                                                                                                                                            "couldNotParse": function(readJSONFile4) {
                                                                                                                                                                return exits.error({
                                                                                                                                                                    data: readJSONFile4,
                                                                                                                                                                    status: 500
                                                                                                                                                                });

                                                                                                                                                            },
                                                                                                                                                            "success": function(readJSONFile4) {
                                                                                                                                                                // Marshal menu metadata
                                                                                                                                                                sails.machines['_project_3549_0.0.26'].MarshaldocPageMetadata({
                                                                                                                                                                    "docPageMetadatas": readJSONFile4
                                                                                                                                                                }).exec({
                                                                                                                                                                    "error": function(marshalMenuMetadata4) {
                                                                                                                                                                        return exits.error({
                                                                                                                                                                            data: marshalMenuMetadata4,
                                                                                                                                                                            status: 500
                                                                                                                                                                        });

                                                                                                                                                                    },
                                                                                                                                                                    "success": function(marshalMenuMetadata4) {
                                                                                                                                                                        // Combine reference and version notes arrays
                                                                                                                                                                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].concat({
                                                                                                                                                                            "firstArray": marshalMenuMetadata3,
                                                                                                                                                                            "secondArray": marshalMenuMetadata4
                                                                                                                                                                        }).exec({
                                                                                                                                                                            "error": function(combineReferenceAndVersionNotesArrays) {
                                                                                                                                                                                return exits.error({
                                                                                                                                                                                    data: combineReferenceAndVersionNotesArrays,
                                                                                                                                                                                    status: 500
                                                                                                                                                                                });

                                                                                                                                                                            },
                                                                                                                                                                            "success": function(combineReferenceAndVersionNotesArrays) {
                                                                                                                                                                                // Combine the combined arrays
                                                                                                                                                                                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].concat({
                                                                                                                                                                                    "firstArray": combineReferenceAndVersionNotesArrays,
                                                                                                                                                                                    "secondArray": combineAnatomyAndConceptsArrays
                                                                                                                                                                                }).exec({
                                                                                                                                                                                    "error": function(combineTheCombinedArrays) {
                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                            data: combineTheCombinedArrays,
                                                                                                                                                                                            status: 500
                                                                                                                                                                                        });

                                                                                                                                                                                    },
                                                                                                                                                                                    "success": function(combineTheCombinedArrays) {
                                                                                                                                                                                        // Get pages for sitemap
                                                                                                                                                                                        sails.machines['_project_3549_0.0.26'].getPagesForSitemap({
                                                                                                                                                                                            "docPageMetadatas": combineTheCombinedArrays
                                                                                                                                                                                        }).setEnvironment({
                                                                                                                                                                                            req: req,
                                                                                                                                                                                            res: res,
                                                                                                                                                                                            sails: sails
                                                                                                                                                                                        }).exec({
                                                                                                                                                                                            "error": function(getPagesForSitemap) {
                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                    data: getPagesForSitemap,
                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                });

                                                                                                                                                                                            },
                                                                                                                                                                                            "success": function(getPagesForSitemap) {
                                                                                                                                                                                                // Build sitemap XML
                                                                                                                                                                                                sails.machines['_project_3549_0.0.26'].buildSitemapXml({
                                                                                                                                                                                                    "webpages": getPagesForSitemap
                                                                                                                                                                                                }).setEnvironment({
                                                                                                                                                                                                    req: req,
                                                                                                                                                                                                    res: res,
                                                                                                                                                                                                    sails: sails
                                                                                                                                                                                                }).exec({
                                                                                                                                                                                                    "error": function(buildSitemapXML) {
                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                            data: buildSitemapXML,
                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                        });

                                                                                                                                                                                                    },
                                                                                                                                                                                                    "success": function(buildSitemapXML) {
                                                                                                                                                                                                        // Resolve path
                                                                                                                                                                                                        sails.machines['2806adc7-0289-473a-8843-020526771565_1.1.0'].resolve({
                                                                                                                                                                                                            "paths": ["assets/sitemap.xml"]
                                                                                                                                                                                                        }).exec({
                                                                                                                                                                                                            "error": function(resolvePath) {
                                                                                                                                                                                                                return exits.error({
                                                                                                                                                                                                                    data: resolvePath,
                                                                                                                                                                                                                    status: 500
                                                                                                                                                                                                                });

                                                                                                                                                                                                            },
                                                                                                                                                                                                            "success": function(resolvePath) {
                                                                                                                                                                                                                // Write file
                                                                                                                                                                                                                sails.machines['8f8944e3-49b6-429d-a4c5-c77fe3ae878d_3.0.0'].write({
                                                                                                                                                                                                                    "destination": resolvePath,
                                                                                                                                                                                                                    "string": buildSitemapXML,
                                                                                                                                                                                                                    "force": true
                                                                                                                                                                                                                }).exec({
                                                                                                                                                                                                                    "error": function(writeFile) {
                                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                                            data: writeFile,
                                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                    },
                                                                                                                                                                                                                    "alreadyExists": function(writeFile) {
                                                                                                                                                                                                                        return exits.error({
                                                                                                                                                                                                                            data: writeFile,
                                                                                                                                                                                                                            status: 500
                                                                                                                                                                                                                        });

                                                                                                                                                                                                                    },
                                                                                                                                                                                                                    "success": function(writeFile) {
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
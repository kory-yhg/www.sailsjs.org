var Machine = require("machine");
module.exports = {
    'find': function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Pick "sails author" (aka sea creature)
                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].sample({
                    "array": ["a giant squid", "clownfish", "starfish", "sea anemones", "merpeople", "mermen", "mermaids", "seahorses", "cuttlefish", "developers", "developers", "developers"]
                }).exec({
                    "error": function(pickSailsAuthorAkaSeaCreature) {
                        return exits.error({
                            data: pickSailsAuthorAkaSeaCreature,
                            status: 500
                        });

                    },
                    "success": function(pickSailsAuthorAkaSeaCreature) {
                        // Read from Storage
                        sails.machines['9b4ccfab-fc89-49a9-bdc1-58bac80ae6ef_0.4.0'].readFromStorage({
                            "key": "mostRecentCommit",
                            "asJSON": "false"
                        }).exec({
                            "error": function(readFromStorage) {
                                return exits.error({
                                    data: readFromStorage,
                                    status: 500
                                });

                            },
                            "notFound": function(readFromStorage) {
                                // List repo commits
                                sails.machines['2bc69db2-4e0b-4308-93aa-3e69abecd4d4_3.0.4'].listRepoCommits({
                                    "repo": "sails",
                                    "owner": "balderdashy"
                                }).exec({
                                    "error": function(listRepoCommits2) {
                                        return exits.error({
                                            data: listRepoCommits2,
                                            status: 500
                                        });

                                    },
                                    "success": function(listRepoCommits2) {
                                        // Get [n]th item
                                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].nth({
                                            "array": listRepoCommits2,
                                            "index": 0
                                        }).exec({
                                            "error": function(getNThItem2) {
                                                return exits.error({
                                                    data: getNThItem2,
                                                    status: 500
                                                });

                                            },
                                            "notFound": function(getNThItem2) {
                                                return exits.error({
                                                    data: getNThItem2,
                                                    status: 500
                                                });

                                            },
                                            "success": function(getNThItem2) {
                                                // Now
                                                sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].now({}).exec({
                                                    "error": function(now3) {
                                                        return exits.error({
                                                            data: now3,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(now3) {
                                                        // Construct dictionary
                                                        sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                            "dictionary": {
                                                                author: {
                                                                    name: (getNThItem2 && getNThItem2.author.name),
                                                                    username: (getNThItem2 && getNThItem2.author.username),
                                                                    avatarUrl: (getNThItem2 && getNThItem2.author.avatarUrl),
                                                                    profileUrl: (getNThItem2 && getNThItem2.author.profileUrl)
                                                                },
                                                                commitUrl: (getNThItem2 && getNThItem2.commitUrl),
                                                                timestamp: (getNThItem2 && getNThItem2.timestamp),
                                                                updatedAt: now3
                                                            }
                                                        }).exec({
                                                            "error": function(constructDictionary7) {
                                                                return exits.error({
                                                                    data: constructDictionary7,
                                                                    status: 500
                                                                });

                                                            },
                                                            "success": function(constructDictionary7) {
                                                                // Stringify as JSON
                                                                sails.machines['28cce2cd-1991-493d-8a0d-1532d85db9a8_1.0.0'].stringify({
                                                                    "value": constructDictionary7
                                                                }).exec({
                                                                    "error": function(stringifyAsJSON) {
                                                                        return exits.error({
                                                                            data: stringifyAsJSON,
                                                                            status: 500
                                                                        });

                                                                    },
                                                                    "couldNotStringify": function(stringifyAsJSON) {
                                                                        return exits.error({
                                                                            data: stringifyAsJSON,
                                                                            status: 500
                                                                        });

                                                                    },
                                                                    "success": function(stringifyAsJSON) {
                                                                        // Save JSON to Storage
                                                                        sails.machines['9b4ccfab-fc89-49a9-bdc1-58bac80ae6ef_0.4.0'].saveJsonToStorage({
                                                                            "key": "mostRecentCommit",
                                                                            "value": stringifyAsJSON
                                                                        }).exec({
                                                                            "error": function(saveJSONToStorage) {
                                                                                return exits.error({
                                                                                    data: saveJSONToStorage,
                                                                                    status: 500
                                                                                });

                                                                            },
                                                                            "success": function(saveJSONToStorage) {
                                                                                // Parse JSON date/time
                                                                                sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].parse({
                                                                                    "datetime": ({
                                                                                        author: (constructDictionary7 && constructDictionary7.author),
                                                                                        commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                        timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                    } && {
                                                                                        author: (constructDictionary7 && constructDictionary7.author),
                                                                                        commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                        timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                    }.timestamp)
                                                                                }).exec({
                                                                                    "error": function(parseJSONDateTime3) {
                                                                                        return exits.error({
                                                                                            data: parseJSONDateTime3,
                                                                                            status: 500
                                                                                        });

                                                                                    },
                                                                                    "invalidDatetime": function(parseJSONDateTime3) {
                                                                                        return exits.respond({
                                                                                            action: "respond_with_status",
                                                                                            status: 200
                                                                                        });

                                                                                    },
                                                                                    "success": function(parseJSONDateTime3) {
                                                                                        // Time from...
                                                                                        sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].timeFrom({
                                                                                            "toWhen": parseJSONDateTime3
                                                                                        }).exec({
                                                                                            "error": function(timeFrom3) {
                                                                                                return exits.error({
                                                                                                    data: timeFrom3,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "invalidToWhen": function(timeFrom3) {
                                                                                                return exits.error({
                                                                                                    data: timeFrom3,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "invalidFromWhen": function(timeFrom3) {
                                                                                                return exits.error({
                                                                                                    data: timeFrom3,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(timeFrom3) {
                                                                                                // Construct dictionary
                                                                                                sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                                    "dictionary": {
                                                                                                        author: ({
                                                                                                            author: (constructDictionary7 && constructDictionary7.author),
                                                                                                            commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                                            timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                                        } && {
                                                                                                            author: (constructDictionary7 && constructDictionary7.author),
                                                                                                            commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                                            timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                                        }.author),
                                                                                                        commitUrl: ({
                                                                                                            author: (constructDictionary7 && constructDictionary7.author),
                                                                                                            commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                                            timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                                        } && {
                                                                                                            author: (constructDictionary7 && constructDictionary7.author),
                                                                                                            commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                                            timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                                        }.commitUrl),
                                                                                                        timestamp: ({
                                                                                                            author: (constructDictionary7 && constructDictionary7.author),
                                                                                                            commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                                            timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                                        } && {
                                                                                                            author: (constructDictionary7 && constructDictionary7.author),
                                                                                                            commitUrl: (constructDictionary7 && constructDictionary7.commitUrl),
                                                                                                            timestamp: (constructDictionary7 && constructDictionary7.timestamp)
                                                                                                        }.timestamp),
                                                                                                        timeAgo: timeFrom3
                                                                                                    }
                                                                                                }).exec({
                                                                                                    "error": function(constructDictionary5) {
                                                                                                        return exits.error({
                                                                                                            data: constructDictionary5,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "success": function(constructDictionary5) {
                                                                                                        // Construct dictionary
                                                                                                        sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                                            "dictionary": {
                                                                                                                nauticalAuthor: pickSailsAuthorAkaSeaCreature,
                                                                                                                latestCommit: constructDictionary5
                                                                                                            }
                                                                                                        }).exec({
                                                                                                            "error": function(constructDictionary6) {
                                                                                                                return exits.error({
                                                                                                                    data: constructDictionary6,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "success": function(constructDictionary6) {
                                                                                                                return exits.respond({
                                                                                                                    data: {
                                                                                                                        data: constructDictionary6
                                                                                                                    },
                                                                                                                    action: "display_view",
                                                                                                                    status: 200,
                                                                                                                    view: "homepage"
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

                            },
                            "success": function(readFromStorage) {
                                // Parse JSON string
                                sails.machines['28cce2cd-1991-493d-8a0d-1532d85db9a8_1.0.0'].parse({
                                    "json": readFromStorage,
                                    "schema": {
                                        author: {
                                            name: "sgress454",
                                            username: "sgress454",
                                            avatarUrl: "http://placeponi.es/150/150",
                                            profileUrl: "http://omfgdogs.com"
                                        },
                                        commitUrl: "http://omfgdogs.com",
                                        timestamp: "2015-04-05T23:34:54.000Z",
                                        updatedAt: 1318781876000
                                    }
                                }).exec({
                                    "error": function(parseJSONString) {
                                        return exits.error({
                                            data: parseJSONString,
                                            status: 500
                                        });

                                    },
                                    "couldNotParse": function(parseJSONString) {
                                        return exits.error({
                                            data: parseJSONString,
                                            status: 500
                                        });

                                    },
                                    "success": function(parseJSONString) {
                                        // Now
                                        sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].now({}).exec({
                                            "error": function(now) {
                                                return exits.error({
                                                    data: now,
                                                    status: 500
                                                });

                                            },
                                            "success": function(now) {
                                                // Subtract (-)
                                                sails.machines['a8ddb9a2-a8f2-417b-b5b3-6feee5b2b142_1.0.0'].subtract({
                                                    "a": now,
                                                    "b": (parseJSONString && parseJSONString.updatedAt)
                                                }).exec({
                                                    "error": function(subtract) {
                                                        return exits.error({
                                                            data: subtract,
                                                            status: 500
                                                        });

                                                    },
                                                    "success": function(subtract) {
                                                        // If greater than (>)
                                                        sails.machines['4bf9c923-efd3-4077-b3e1-6b8d84d740c0_0.4.0'].ifGreaterThan({
                                                            "a": subtract,
                                                            "b": 10800000,
                                                            "isInclusive": true
                                                        }).exec({
                                                            "error": function(ifGreaterThan) {
                                                                return exits.error({
                                                                    data: ifGreaterThan,
                                                                    status: 500
                                                                });

                                                            },
                                                            "otherwise": function(ifGreaterThan) {
                                                                // Parse JSON date/time
                                                                sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].parse({
                                                                    "datetime": ({
                                                                        author: (parseJSONString && parseJSONString.author),
                                                                        commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                        timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                    } && {
                                                                        author: (parseJSONString && parseJSONString.author),
                                                                        commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                        timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                    }.timestamp)
                                                                }).exec({
                                                                    "error": function(parseJSONDateTime2) {
                                                                        return exits.error({
                                                                            data: parseJSONDateTime2,
                                                                            status: 500
                                                                        });

                                                                    },
                                                                    "invalidDatetime": function(parseJSONDateTime2) {
                                                                        return exits.respond({
                                                                            action: "respond_with_status",
                                                                            status: 200
                                                                        });

                                                                    },
                                                                    "success": function(parseJSONDateTime2) {
                                                                        // Time from...
                                                                        sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].timeFrom({
                                                                            "toWhen": parseJSONDateTime2
                                                                        }).exec({
                                                                            "error": function(timeFrom2) {
                                                                                return exits.error({
                                                                                    data: timeFrom2,
                                                                                    status: 500
                                                                                });

                                                                            },
                                                                            "invalidToWhen": function(timeFrom2) {
                                                                                return exits.error({
                                                                                    data: timeFrom2,
                                                                                    status: 500
                                                                                });

                                                                            },
                                                                            "invalidFromWhen": function(timeFrom2) {
                                                                                return exits.error({
                                                                                    data: timeFrom2,
                                                                                    status: 500
                                                                                });

                                                                            },
                                                                            "success": function(timeFrom2) {
                                                                                // Construct dictionary
                                                                                sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                    "dictionary": {
                                                                                        author: ({
                                                                                            author: (parseJSONString && parseJSONString.author),
                                                                                            commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                                            timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                                        } && {
                                                                                            author: (parseJSONString && parseJSONString.author),
                                                                                            commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                                            timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                                        }.author),
                                                                                        commitUrl: ({
                                                                                            author: (parseJSONString && parseJSONString.author),
                                                                                            commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                                            timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                                        } && {
                                                                                            author: (parseJSONString && parseJSONString.author),
                                                                                            commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                                            timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                                        }.commitUrl),
                                                                                        timestamp: ({
                                                                                            author: (parseJSONString && parseJSONString.author),
                                                                                            commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                                            timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                                        } && {
                                                                                            author: (parseJSONString && parseJSONString.author),
                                                                                            commitUrl: (parseJSONString && parseJSONString.commitUrl),
                                                                                            timestamp: (parseJSONString && parseJSONString.timestamp)
                                                                                        }.timestamp),
                                                                                        timeAgo: timeFrom2
                                                                                    }
                                                                                }).exec({
                                                                                    "error": function(constructDictionary3) {
                                                                                        return exits.error({
                                                                                            data: constructDictionary3,
                                                                                            status: 500
                                                                                        });

                                                                                    },
                                                                                    "success": function(constructDictionary3) {
                                                                                        // Construct dictionary
                                                                                        sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                            "dictionary": {
                                                                                                nauticalAuthor: pickSailsAuthorAkaSeaCreature,
                                                                                                latestCommit: constructDictionary3
                                                                                            }
                                                                                        }).exec({
                                                                                            "error": function(constructDictionary4) {
                                                                                                return exits.error({
                                                                                                    data: constructDictionary4,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(constructDictionary4) {
                                                                                                return exits.respond({
                                                                                                    data: {
                                                                                                        data: constructDictionary4
                                                                                                    },
                                                                                                    action: "display_view",
                                                                                                    status: 200,
                                                                                                    view: "homepage"
                                                                                                });

                                                                                            }
                                                                                        });

                                                                                    }
                                                                                });

                                                                            }
                                                                        });

                                                                    }
                                                                });

                                                            },
                                                            "success": function(ifGreaterThan) {
                                                                // List repo commits
                                                                sails.machines['2bc69db2-4e0b-4308-93aa-3e69abecd4d4_3.0.4'].listRepoCommits({
                                                                    "repo": "sails",
                                                                    "owner": "balderdashy"
                                                                }).exec({
                                                                    "error": function(listRepoCommits) {
                                                                        return exits.error({
                                                                            data: listRepoCommits,
                                                                            status: 500
                                                                        });

                                                                    },
                                                                    "success": function(listRepoCommits) {
                                                                        // Get [n]th item
                                                                        sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].nth({
                                                                            "array": listRepoCommits,
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
                                                                                // Now
                                                                                sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].now({}).exec({
                                                                                    "error": function(now2) {
                                                                                        return exits.error({
                                                                                            data: now2,
                                                                                            status: 500
                                                                                        });

                                                                                    },
                                                                                    "success": function(now2) {
                                                                                        // Construct dictionary
                                                                                        sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                            "dictionary": {
                                                                                                author: {
                                                                                                    name: (getNThItem && getNThItem.author.name),
                                                                                                    username: (getNThItem && getNThItem.author.username),
                                                                                                    avatarUrl: (getNThItem && getNThItem.author.avatarUrl),
                                                                                                    profileUrl: (getNThItem && getNThItem.author.profileUrl)
                                                                                                },
                                                                                                commitUrl: (getNThItem && getNThItem.commitUrl),
                                                                                                timestamp: (getNThItem && getNThItem.timestamp),
                                                                                                updatedAt: now2
                                                                                            }
                                                                                        }).exec({
                                                                                            "error": function(constructDictionary8) {
                                                                                                return exits.error({
                                                                                                    data: constructDictionary8,
                                                                                                    status: 500
                                                                                                });

                                                                                            },
                                                                                            "success": function(constructDictionary8) {
                                                                                                // Stringify as JSON
                                                                                                sails.machines['28cce2cd-1991-493d-8a0d-1532d85db9a8_1.0.0'].stringify({
                                                                                                    "value": constructDictionary8
                                                                                                }).exec({
                                                                                                    "error": function(stringifyAsJSON2) {
                                                                                                        return exits.error({
                                                                                                            data: stringifyAsJSON2,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "couldNotStringify": function(stringifyAsJSON2) {
                                                                                                        return exits.error({
                                                                                                            data: stringifyAsJSON2,
                                                                                                            status: 500
                                                                                                        });

                                                                                                    },
                                                                                                    "success": function(stringifyAsJSON2) {
                                                                                                        // Save JSON to Storage
                                                                                                        sails.machines['9b4ccfab-fc89-49a9-bdc1-58bac80ae6ef_0.4.0'].saveJsonToStorage({
                                                                                                            "key": "mostRecentCommit",
                                                                                                            "value": stringifyAsJSON2
                                                                                                        }).exec({
                                                                                                            "error": function(saveJSONToStorage2) {
                                                                                                                return exits.error({
                                                                                                                    data: saveJSONToStorage2,
                                                                                                                    status: 500
                                                                                                                });

                                                                                                            },
                                                                                                            "success": function(saveJSONToStorage2) {
                                                                                                                // Parse JSON date/time
                                                                                                                sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].parse({
                                                                                                                    "datetime": ({
                                                                                                                        author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                        commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                        timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                    } && {
                                                                                                                        author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                        commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                        timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                    }.timestamp)
                                                                                                                }).exec({
                                                                                                                    "error": function(parseJSONDateTime) {
                                                                                                                        return exits.error({
                                                                                                                            data: parseJSONDateTime,
                                                                                                                            status: 500
                                                                                                                        });

                                                                                                                    },
                                                                                                                    "invalidDatetime": function(parseJSONDateTime) {
                                                                                                                        return exits.respond({
                                                                                                                            action: "respond_with_status",
                                                                                                                            status: 200
                                                                                                                        });

                                                                                                                    },
                                                                                                                    "success": function(parseJSONDateTime) {
                                                                                                                        // Time from...
                                                                                                                        sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.2.0'].timeFrom({
                                                                                                                            "toWhen": parseJSONDateTime
                                                                                                                        }).exec({
                                                                                                                            "error": function(timeFrom) {
                                                                                                                                return exits.error({
                                                                                                                                    data: timeFrom,
                                                                                                                                    status: 500
                                                                                                                                });

                                                                                                                            },
                                                                                                                            "invalidToWhen": function(timeFrom) {
                                                                                                                                return exits.error({
                                                                                                                                    data: timeFrom,
                                                                                                                                    status: 500
                                                                                                                                });

                                                                                                                            },
                                                                                                                            "invalidFromWhen": function(timeFrom) {
                                                                                                                                return exits.error({
                                                                                                                                    data: timeFrom,
                                                                                                                                    status: 500
                                                                                                                                });

                                                                                                                            },
                                                                                                                            "success": function(timeFrom) {
                                                                                                                                // Construct dictionary
                                                                                                                                sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                                                                    "dictionary": {
                                                                                                                                        author: ({
                                                                                                                                            author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                                            commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                                            timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                                        } && {
                                                                                                                                            author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                                            commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                                            timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                                        }.author),
                                                                                                                                        commitUrl: ({
                                                                                                                                            author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                                            commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                                            timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                                        } && {
                                                                                                                                            author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                                            commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                                            timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                                        }.commitUrl),
                                                                                                                                        timestamp: ({
                                                                                                                                            author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                                            commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                                            timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                                        } && {
                                                                                                                                            author: (constructDictionary8 && constructDictionary8.author),
                                                                                                                                            commitUrl: (constructDictionary8 && constructDictionary8.commitUrl),
                                                                                                                                            timestamp: (constructDictionary8 && constructDictionary8.timestamp)
                                                                                                                                        }.timestamp),
                                                                                                                                        timeAgo: timeFrom
                                                                                                                                    }
                                                                                                                                }).exec({
                                                                                                                                    "error": function(constructDictionary) {
                                                                                                                                        return exits.error({
                                                                                                                                            data: constructDictionary,
                                                                                                                                            status: 500
                                                                                                                                        });

                                                                                                                                    },
                                                                                                                                    "success": function(constructDictionary) {
                                                                                                                                        // Construct dictionary
                                                                                                                                        sails.machines['1ce3619d-97b1-4aec-a3e9-884c7ed24556_2.1.0'].construct({
                                                                                                                                            "dictionary": {
                                                                                                                                                nauticalAuthor: pickSailsAuthorAkaSeaCreature,
                                                                                                                                                latestCommit: constructDictionary
                                                                                                                                            }
                                                                                                                                        }).exec({
                                                                                                                                            "error": function(constructDictionary2) {
                                                                                                                                                return exits.error({
                                                                                                                                                    data: constructDictionary2,
                                                                                                                                                    status: 500
                                                                                                                                                });

                                                                                                                                            },
                                                                                                                                            "success": function(constructDictionary2) {
                                                                                                                                                return exits.respond({
                                                                                                                                                    data: {
                                                                                                                                                        data: constructDictionary2
                                                                                                                                                    },
                                                                                                                                                    action: "display_view",
                                                                                                                                                    status: 200,
                                                                                                                                                    view: "homepage"
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
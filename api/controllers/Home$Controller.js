var Machine = require("machine");
module.exports = {
    find: function(req, res) {
        Machine.build({
            inputs: {},
            exits: {
                respond: {}
            },
            fn: function(inputs, exits) {
                // Pick "sails author" (aka sea creature)
                sails.machines['c646f5e7-9c6f-49a5-91f6-7e1eabfd1186_3.0.2'].sample({
                    "array": ["developer", "developers", "developers", "a giant squid", "clownfish", "starfish", "sea anemones", "merpeople", "mermen", "mermaids", "seahorses", "cuttlefish"]
                }).exec({
                    "error": function(pickSailsAuthorAkaSeaCreature) {
                        return exits.error({
                            data: pickSailsAuthorAkaSeaCreature,
                            status: 500
                        });

                    },
                    "success": function(pickSailsAuthorAkaSeaCreature) {
                        // List repo commits
                        sails.machines['2bc69db2-4e0b-4308-93aa-3e69abecd4d4_3.0.4'].listRepoCommits({
                            "repo": "sails",
                            "owner": "balderdashy"
                        }).exec({
                            "error": function(listRepoCommits) {
                                return exits.respond({
                                    data: {
                                        nauticalAuthor: pickSailsAuthorAkaSeaCreature
                                    },
                                    action: "display_view",
                                    status: 500,
                                    view: "homepage"
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
                                        // Parse JSON date/time
                                        sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.1.1'].parse({
                                            "datetime": (getNThItem && getNThItem.timestamp)
                                        }).exec({
                                            "error": function(parseJSONDateTime) {
                                                return exits.error({
                                                    data: parseJSONDateTime,
                                                    status: 500
                                                });

                                            },
                                            "invalidDatetime": function(parseJSONDateTime) {
                                                return exits.error({
                                                    data: parseJSONDateTime,
                                                    status: 500
                                                });

                                            },
                                            "success": function(parseJSONDateTime) {
                                                // Time from...
                                                sails.machines['fdb941c0-10c4-4a56-bb13-f491beafa7a9_1.1.1'].timeFrom({
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
                                                                author: {
                                                                    name: (getNThItem && getNThItem.author.name),
                                                                    username: (getNThItem && getNThItem.author.username),
                                                                    avatarUrl: (getNThItem && getNThItem.author.avatarUrl),
                                                                    profileUrl: (getNThItem && getNThItem.author.profileUrl)
                                                                },
                                                                commitUrl: (getNThItem && getNThItem.commitUrl),
                                                                timestamp: (getNThItem && getNThItem.timestamp),
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
                                                                return exits.respond({
                                                                    data: {
                                                                        nauticalAuthor: pickSailsAuthorAkaSeaCreature,
                                                                        latestCommit: constructDictionary
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
        }).configure(req.params.all(), {
            respond: res.response,
            error: res.negotiate
        }).exec();
    }
};
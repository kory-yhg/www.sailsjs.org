/**
 * Module dependencies
 */

var Github = require('github');
var switchback = require('node-switchback');



module.exports = {

  fn: function (opts, cb) {
    sb = switchback(cb);

    var github = new Github({
        // required
        version: '3.0.0',
        // optional
        // debug: true,
        // protocol: 'https',
        // host: 'github.my-GHE-enabled-company.com',
        // pathPrefix: '/api/v3', // for some GHEs
        // timeout: 5000
    });

    github.repos.get({
      repo: opts.repo||'sails',
      user: opts.user||'balderdashy'
    }, sb);
  }

};

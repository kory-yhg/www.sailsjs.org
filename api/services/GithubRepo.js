/**
 * Module dependencies
 */

var Github = require('github');
var switchback = require('node-switchback');

// Constants
var _3HOURS = 1000*60*60*3;

module.exports = {

  fn: function (opts, cb) {
    sb = switchback(cb);

    // Cache results to avoid exceeding our github rate limit
    var _3hoursago = new Date((new Date())-_3HOURS);
    News.find({
      createdAt: { '>=': _3hoursago },
      repo: opts.repo,
      user: opts.user
    })
    .sort('createdAt DESC')
    .limit(1)
    .exec({
      error: sb.error,
      success: function (cachedNews) {
        if (cachedNews.length) {
          return sb.success(cachedNews[0].data);
        }

        // console.log('FETCHING IT AGAIN');

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
        }, function (err, data) {
          if (err) return sb(err);

          // Cache the result
          News.create({
            repo: opts.repo,
            user: opts.user,
            data: data
          }).exec(function (err) {
            if (err) return sb(err);
            return sb.success(data);
          });

        });
      },
    });

  }

};

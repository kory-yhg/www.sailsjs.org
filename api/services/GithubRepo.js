/**
 * Module dependencies
 */

var Github = require('github');
var switchback = require('node-switchback');


// Constants
var _3HOURS = 1000*60*60*3;

module.exports = {

  fn: function (opts, cb) {
    var sb = switchback(cb);

    // Cache results to avoid exceeding our github rate limit
    var _3hoursago = new Date((new Date())-_3HOURS);
    Cache.find()
    .where({
      createdAt: { '>': _3hoursago },
      repo: opts.repo,
      user: opts.user
    })
    .sort('createdAt DESC')
    .limit(1)
    .exec({
      error: sb.error,
      success: function (cached) {
        if (cached.length) {
          return sb.success(cached[0].data);
        }

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
          repo: opts.repo,
          user: opts.user
        }, function (err, data) {
          if (err) return sb(err);

          console.log(data.length);

          // Cache the result
          Cache.create({
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

    // Chainable event emitter
    return sb;
  }

};


// /**
//  * [buildChainableSwitchback description]
//  * @param  {Function|Object} _sb
//  * @return {[type]}      [description]
//  */
// function buildChainableSwitchback(_sb) {
//   var ev = new EventEmitter();
//   var sb = switchback(function (err, result) {
//     if (err) {
//       if (_sb) { return switchback(_sb).error(err); }
//       else ev.emit('error', err);
//     }
//     else {
//       console.log('ok success!', _sb);
//       if (_sb) { return switchback(_sb).success(result); }
//       else ev.emit('success', result);
//     }
//   });
//   return sb;
// }


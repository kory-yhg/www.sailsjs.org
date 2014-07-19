/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  /**
   * `NewsController.find()`
   */
  find: function(req, res) {

    // Cache results to avoid exceeding our github rate limit
    Cache.find()
    .where({
      createdAt: {
        '>': new Date((new Date()) - 1000 * 60 * 60 * 3)
      },
      user: 'balderdashy',
      repo: 'sails'
    })
    .sort('createdAt DESC')
    .limit(1)
    .exec(function(err, cached) {
      if (err) return res.serverError(err);

      if (cached.length) {
        return res.ok(cached[0].data);
      }

      require('node-machine')
      .machine('machinepack-github/get-repo-commits')
      .configure({
        user: 'balderdashy',
        repo: 'sails'
      })
      .exec({
        error: res.serverError,
        success: function (data){

          // Cache the result
          Cache.create({
            user: 'balderdashy',
            repo: 'sails',
            data: data
          })
          .exec(function(err) {
            if (err) return res.serverError(err);
            return res.ok(data);
          });
        }
      });
    });
  }

};

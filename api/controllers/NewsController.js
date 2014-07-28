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

    require('node-machine')
    .build(require('machinepack-github/get-repo-commits'))
    .configure({
      user: 'balderdashy',
      repo: 'sails',
      _cache: { model: Cache }
    })
    .exec(res.respond);

  }

};

/**
 * Module dependencies
 */

var Github = require('machinepack-github');



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

    if (req.param('path')) {
      return res.ok();
    }

    Github.getRepoCommits({
      user: 'balderdashy',
      repo: 'sails'
    })
    .cache({ model: Cache })
    .exec(res.respond);

  }

};

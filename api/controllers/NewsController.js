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

    GetRepoCommits.fn({
      repo: req.param('repo'),
      user: req.param('user')
    })
    .on('error', res.serverError)
    .on('success', function (repo) {
      res.json(repo);
    });
  }
};

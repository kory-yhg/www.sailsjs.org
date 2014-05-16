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

    GithubRepo.fn({
      repo: 'sails',
      user: 'balderdashy'
    })
    .on('error', res.serverError)
    .on('success', function (repo) {
      res.json(repo);
    });
  }
};

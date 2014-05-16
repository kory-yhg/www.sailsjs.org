/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  foo: function (req, res) {
    res.serverError({wtf: 'omg'});
  },

  bar: function (req, res) {
    res.render('foo');
  },

  /**
   * `NewsController.find()`
   */
  find: function(req, res) {

    GithubRepo.fn({
      repo: 'sails',
      user: 'balderdashy'
    }, {
      error: function(err) {
        return res.serverError({
          hi: 'there'
        });
      },
      success: function (repo) {
        res.json(repo);
      }
    });
  }
};

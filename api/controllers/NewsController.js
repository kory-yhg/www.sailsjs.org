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

    var Machine = require('node-machine');


    if (req.param('path')) {
      return res.ok();
      // Machine.build(require('machinepack-github/get-repo-commits-at-path'))
      // .configure({
      //   user: 'balderdashy',
      //   repo: 'sails-docs',
      //   path: req.param('path')
      // })
      // .cache({ model: Cache })
      // .exec(res.respond);
    }
    else {
      Machine.build(require('machinepack-github/get-repo-commits'))
      .configure({
        user: 'balderdashy',
        repo: 'sails'
      })
      .cache({ model: Cache })
      .exec(res.respond);
    }

  }

};

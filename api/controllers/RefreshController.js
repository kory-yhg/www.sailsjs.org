/**
 * Used for compiling markdown documentation into HTML templates.
 * @type {Object}
 */
module.exports = {

  index: function(req, res) {
    DocCompilerService(function (err, metadata) {
      if (err) return res.serverError(err);
      return res.ok();
    });
  }
};

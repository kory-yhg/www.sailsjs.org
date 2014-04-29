/**
 * Used for compiling markdown documentation into HTML templates.
 * @type {Object}
 */
module.exports = {

  index: function(req, res) {

    DocCompiler(function (err, metadata) {
      if (err) return res.serverError(err);
      else {
        console.log('No errors.  WOOOO!');
        return res.send(200);
        //'Success:' + JSON.stringify(result) + '<br>Errors:' + JSON.stringify(err));
      }
    });
  }
};

/**
 * Used for compiling markdown documentation into HTML templates.
 * @type {Object}
 */

module.exports = {

  index: function(req, res) {

    require('node-machine')
    .build({
      fn: function($i, $x) {
        DocCompilerService($x);
      }
    })
    .configure({})
    // Throttle how often the docs can be refreshed
    // (i.e. no more than once per minute)
    .cache({
      model: Cache,
      ttl: 60000
    })
    .exec(res.respond);
  }
};

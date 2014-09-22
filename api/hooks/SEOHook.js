module.exports = function (sails) {
  return {
    initialize: function (cb){
      return cb();
    },

    routes: {
      before: {
        'get /': function (req, res, next) {

          // For humans
          if (!req.param('_escaped_fragment_')){
            return next();
          }

          // For search engines
          // (TODO finish this up)
          return res.send('hi google');
        }
      }
    }
  };
};

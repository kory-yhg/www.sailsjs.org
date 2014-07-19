module.exports = function respond(err, data) {
  var res = this.res;
  if (err) return res.negotiate(err);
  return res.ok(data);
};

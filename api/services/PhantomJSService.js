/**
 * Module dependencies
 */

var ChildProc = require('child_process');
var ShellPack = require('shell-pack');
var Path = require('path');
var Util = require('util');
var ConcatStream = require('concat-stream');



var WHICH_PHANTOM_JS = '/usr/local/bin/phantomjs';

module.exports = {

  renderPages: function (options, cb){

    var webpages = [];

    async.eachLimit(options.urls, 5, function (url, next) {

      getWebpageHTML({url: url}, function (err, compiledHTML){
        if (err) return next(err);

        // console.log('FOR URL %s, got html: %s', url, compiledHTML);
        webpages.push({
          url: url,
          html: compiledHTML
        });

        next();
      });

    }, function (err) {
      if (err) return cb(err);
      return cb(null, webpages);
    });
  }
};



function getWebpageHTML (opts, cb) {
  opts = opts||{};

  var SPINLOCK=0;
  var _cb = function (err, result){
    if (SPINLOCK) return;
    SPINLOCK++;
    if (err) return cb(err);

    // Trim weird stuff
    result = result.replace(/^.*<!DOCTYPE/, '<!DOCTYPE');
    result = result.replace(/(<\/html>\s*)\S*$/, '</html>\n');

    return cb(null, result);
  };

  var __html = getWebpageHTMLStream({
    url: opts.url
  });

  __html.pipe((function buildConcatStream(){
    var tmp__ = ConcatStream(function(html) {
      // `html` is the webpage contents as a Buffer
      html = html.toString('utf8');

      // console.log('OK DONE!');
      return _cb(null, html);
    });
    tmp__.once('error', _cb);
    tmp__.on('error', _NOOP);
    return tmp__;
  })());
  __html.once('error', _cb);
  __html.on('error', _NOOP);

  function _NOOP(){}
}

function getWebpageHTMLStream (opts){
  opts = opts||{};

  if (!opts.url) throw new Error('Missing `url` option');

  var child = (function buildAndExecChildProcess(child){
    child = ChildProc.exec((function buildCmdForSpawn(){
      // * * * * * * * * * * * * * * *
      // produces something like:
      // phantomjs /Users/mikermcneil/code/www.sailsjs.org/tasks/custom/fetch-html.phantom.js
      // * * * * * * * * * * * * * * *
      return Util.format(
        '%s %s %s',
        WHICH_PHANTOM_JS,
        (function buildPathToPhantomScript(){
          return Path.resolve(__dirname,'../../tasks/custom/fetch-html.phantom.js');
        })(),
        opts.url
      );
    })());
    child.on('error', function (err){
      console.error('ERROR:');
      console.error(err);
    });
    return child;
  })();

  // dont need this part right now:
  // process.stdin.pipe(child.stdin);

  // Return a readable stream
  return ShellPack.pack(child);
  // return child.


  // as always:
  //  >---<3--> substack
  //
  // (adapted from example here: https://github.com/substack/shell-pack#example)
}


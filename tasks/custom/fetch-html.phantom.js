//////////////////////////////////////////////////////////////////////////////////////////
// adapted from https://github.com/steeve/angular-seo/blob/master/angular-seo-server.js#L23
//////////////////////////////////////////////////////////////////////////////////////////

function renderHTML (url, cb) {
    var page = (function buildPage (){
      return require('webpage').create();
    })();

    page.settings.loadImages = false;
    page.settings.localToRemoteUrlAccessEnabled = true;
    page.onCallback = function() {
        cb(null, page.content);
        page.close();
    };
    page.onInitialized = function() {
       page.evaluate(function() {
            setTimeout(function() {
                window.callPhantom();
            }, 10000);
        });
    };
    //    page.onConsoleMessage = function(msg, lineNum, sourceId) {
    //        console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
    //    };
    page.open(url);
    return page;
}


var system = require('system');

if (system.args.length < 2) {
    console.error('Missing required argument(s): "url"');
    console.error('My arguments:', system.args);
    phantom.exit(1);
}

var URL = system.args[1];

// console.log('Fetching from: %s', URL);

renderHTML(URL, function (err, html) {
  if (err) {
    console.error('ERROR:');
    console.error(err);
    return phantom.exit(1);
  }

  console.log(html);
  return phantom.exit(0);
});

//////////////////////////////////////////////////////////////////////////////////////////





// old way:

// var system = require('system');
// var fs = require('fs');
// var page = new WebPage();
// var url = system.args[1];
// var output = system.args[2];
// var result;


// page.open(url, function(status) {
//   if (status !== 'success') {
//     console.log('FAILED to load the url');
//     phantom.exit();
//   } else {
//     result = page.evaluate(function() {
//       var html, doc;

//       html = document.querySelector('html');

//       return html.outerHTML;
//     });

//     if (output) {

//       var rendered = fs.open(output, 'w');
//       rendered.write(result);
//       rendered.flush();
//       rendered.close();

//     } else {

//       console.log(result);

//     }
//   }
//   phantom.exit();
// });

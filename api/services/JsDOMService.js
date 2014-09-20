// var jsdom = require('jsdom');
// var xmlhttp  = require("xmlhttprequest");
var renderer = require('angular-jsdom-renderer');

module.exports = {

  renderPages: function (options, cb){

    var webpages = [];

    async.each(options.urls, function (url, next) {

      // render using a timeout only

      renderer.render({
          /* url to retrieve the html from */
          url: url,

          /* how long to wait until rendering the content. default 5000 */
          timeoutMs: 5000,

          /* complete callback. this = config */
          done: function(errors, window) {
            // if (errors) {
            //     console.log(errors);
            //     return;
            // }

            var document = window.document;
            var compiledHtml = document.outerHTML;
            // // var angular = window.angular
            // console.log(compiledHtml);

            webpages.push({
              url: url,
              html: compiledHtml
            });

            next();

            // (supposedly: window will close after this function returns)
          }
      });

      // jsdom.env({
      //   url: url,
      //   FetchExternalResources: ['script'],
      //   ProcessExternalResources: ['script'],
      //   created: function (errors, window) {
      //     if (errors) {
      //       console.error('created: ERRORS:',errors);
      //     }
      //     window.XMLHttpRequest = xmlhttp.XMLHttpRequest;
      //   },
      //   done: function (errors, window) {
      //     if (errors) {
      //       console.error('done: ERRORS:',errors);
      //       return next(errors);
      //     }

      //     console.log('window.location ->',window.location);

      //     try {
      //       webpages.push({
      //         url: url,
      //         html: window.document.documentElement.outerHTML
      //       });
      //     }
      //     catch (e) {}
      //     window.close();
      //     return next();
      //   }
      // });

    }, function (err) {
      if (err) return cb(err);
      return cb(null, webpages);
    });
  }
};

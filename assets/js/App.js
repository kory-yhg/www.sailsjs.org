/**
 *
 * @region page
 */
// Mast.define('App', function () {
//   return {



//     // Route definitions

//     '#!': function () {
//       this.attachPage('HomePage');
//       Mast.models.App.set('currentPage', 'home');
//     },

//     '#!getStarted' : function () {
//       this.attachPage('GetStartedPage');
//       Mast.models.App.set('currentPage', 'get-started');
//     },

//     '#!sails-angular': function() {
//       this.attachPage('HowToPage');
//       Mast.models.App.set('currentPage', 'get-started');
//     },

//     '#!logos' : function() {
//       this.attachPage('LogosPage');
//       Mast.models.App.set('currentPage', 'logos');
//     },

//     '#!documentation': function() {
//       this.attachPage('DocsMainPage');
//       Mast.models.App.set('currentPage', 'documentation');
//     },

//     '#!documentation/anatomy' : function() {
//       this.renderDocSection('documentation/anatomy', 'DocsSection_anatomy');
//       Mast.models.App.set('currentPage', 'documentation/anatomy');
//     },

//     '#!documentation/anatomy/*path': function(path) {
//       // The root that all paths are under.
//       // eg (api.html is under myApp/api.html);
//       var root = 'myApp/',
//           fullPath = root + path + '.html';

//       // If this template doesn't exist, do nothing.
//       if (!Mast.templates.hasOwnProperty(fullPath)) {
//         return;
//       }

//       // If we are already on this page, do nothing
//       if(Mast.models.App.get('currentPage') === 'documentation/anatomy') {
//         Mast.trigger('%changeContent', path);
//         return;
//       }

//       this.renderDocSection('documentation/anatomy', 'DocsSection_anatomy');
//       Mast.models.App.set('currentPage', 'documentation/anatomy');
//     },

//     '#!documentation/support' : function() {
//       this.renderDocSection('documentation/support', 'DocsSection_supportMatrix');
//     },

//     '#!documentation/changelog/0.9.8' : function() { this.renderChangelog('0.9.8'); },
//     '#!documentation/changelog/0.9.7' : function() { this.renderChangelog('0.9.7'); },
//     '#!documentation/changelog/0.9.4' : function() { this.renderChangelog('0.9.4'); },
//     '#!documentation/changelog/0.9.0' : function() { this.renderChangelog('0.9.0'); },
//     '#!documentation/changelog/0.8.9' : function() { this.renderChangelog('0.8.9'); },
//     '#!documentation/changelog/0.8.8x' : function() { this.renderChangelog('0.8.8x'); },
//     '#!documentation/changelog/0.8.7x' : function() { this.renderChangelog('0.8.7x'); },
//     '#!documentation/changelog/before0.8.77' : function() { this.renderChangelog('before0.8.77'); },
   

//     '#!documentation/guides/:page' : function() {
//       this.renderDocSection('documentation/guides', 'DocumentationPage');
//     },

//     // Reference pages a bit different and require a bit more logic to get the page
//     // rendered correctly.
//     '#!documentation/reference/:topic/:topic2' : function ( topic, topic2) {

//       // Idea? return component when calling region.attach()
//       var self = this;

//       // Set current docs reference page.
//       Mast.models.App.set('docReferencePage', topic + '_' + topic2);


//       var currentPage = Mast.models.App.get('currentPage');

//       // Dont attach the DocsSection_reference if it is alrady appened.
//       if (Mast.models.App.get('currentPage')==='documentation/reference') {
//           var DocsSection = self.page._children[0];
//           var DocsSection_reference = DocsSection.contentRegion._children[0];
//           DocsSection_reference.mainContentRegion.attach(topic+'/'+topic2);
//           Mast.models.App.set('currentPage', 'documentation/reference');
//           Mast.trigger('%docReferenceNav', topic);
//           Mast.trigger('%renderStackOverflowLinks');
//       }

//       // Append all the views.
//       else {
//         self.attachPage('DocsSection', false, function () {

//           // A bit hacky. Get access to the components that we need to append the
//           // proper page for this `topic`.
//           var DocsSection = self.page._children[0];
//           DocsSection.contentRegion.attach('DocsSection_reference');
//           var DocsSection_reference = DocsSection.contentRegion._children[0];

//           // Error handling if their is no topic with this name
//           if ( !Mast.templates[topic+'/'+topic2] ){
//             Mast.error('Hmm.. can\'t find template :: ', topic+'/'+topic2);
//             return;
//           }

//           // Render the appropriate reference page
//           DocsSection_reference.mainContentRegion.attach(topic+'/'+topic2);
//           Mast.models.App.set('currentPage', 'documentation/reference');
//           Mast.trigger('%docReferenceNav', topic);
//         });
//       }
//     },

//     '#!documentation/reference(/)': function(){
//       window.location.href="#!documentation/reference/Blueprints/Blueprints.html";
//     },

//     // Private methods and properties

//     // probably can be removed..?
//     // className: 'app',

//     // Define a top-level model
//     model: (Mast.data.App = new Backbone.Model()),

//     // Put a new page component in the main content section
//     attachPage: function (page, noAnimation, cb) {
//       cb = cb || function () {};
//       var self = this;

//       // Keep track of the current page
//       this.model.set({ currentPage: page });

//       // Show or hide documentation nav when appropriate
//       if (page === "DocumentationPage") {
//         $('.docs-menu').addClass('visible');
//       } else {
//         $('.docs-menu').removeClass('visible');
//       }

//       // Just attach the page with no animation
//       if (noAnimation) {
//         this.scrollToTop();
//         this.page.attach(page);
//         return cb();
//       }

//       // Attach the page with animation
//       this.page.$el.fadeOut(200, function () {
//         self.scrollToTop();
//         self.page.attach(page);
//         self.page.$el.fadeIn(200, cb);
//       });
//     },

//     // Scroll viewport to top of document
//     scrollToTop: function (duration) {
//       $('html,body').animate({
//         scrollTop: 0
//       }, duration || 250);
//     },


//     /**
//      * Renders the appropriate doc section and uses logic to deteremin for to do that.
//      *
//      * @param  {String} page        [page of the documentation that we want ot render]
//      * @param  {String} componentId [Component that actaully gets rendered]
//      */
//     renderDocSection: function(page, componentId) {

//       // The user is already on the current page so we just need to append the doc component
//       // to the region thats already there.
//       if (Mast.models.App.get('currentPage') === page) {
//         var DocsSection = this.page._children[0];
//         DocsSection.contentRegion.attach(componentId);
//       }

//       // The user is not on the current page, so we must first attach the doc page, and then attach
//       // the proper component in that doc page.
//       else {
//         var self = this;
//         this.attachPage('DocsSection', false, function () {

//           // A bit hacky. Get access to the components that we need to append the
//           // proper page for this `topic`.
//           var DocsSection = self.page._children[0];
//           DocsSection.contentRegion.attach(componentId);
//           Mast.models.App.set('currentPage', page);
//         });
//       }
//     },

//     /**
//      * Show the specified changelog as a documentation page.
//      * 
//      * @param  {[type]} version [description]
//      * @return {[type]}         [description]
//      */
//     renderChangelog: function (version) {
//       // Mast.trigger('%docReferenceNav', '');
//       this.renderDocSection('documentation/changelog/'+version, 'Changelog_' + version)
//     }

//   };
// });



angular.module('Sails', [
  'ngRoute'
]);

angular.module('Sails')
  .config(['$routeProvider', function($routeProvider) {

    $routeProvider

    .when('/', {
      templateUrl: 'templates/pages/HomePage.html'
    })

    .otherwise({
      redirectTo: '/'
    });
  }
]);


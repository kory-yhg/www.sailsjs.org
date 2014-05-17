// Routes
// *********************
//
// This table routes urls to controllers/actions.
//
// If the URL is not specified here, the default route for a URL is:  /:controller/:action/:id
// where :controller, :action, and the :id request parameter are derived from the url
//
// If :action is not specified, Sails will redirect to the appropriate action
// based on the HTTP verb: (using REST/Backbone conventions)
//
//		GET:	/:controller/read/:id
//		POST:	/:controller/create
//		PUT:	/:controller/update/:id
//		DELETE:	/:controller/destroy/:id
//
// If the requested controller/action doesn't exist:
//   - if a view exists ( /views/:controller/:action.ejs ), Sails will render that view
//   - if no view exists, but a model exists, Sails will automatically generate a
//       JSON API for the model which matches :controller.
//   - if no view OR model exists, Sails will respond with a 404.
//
module.exports.routes = {

  // Serve .jsmenu files with a "Content-Type: text/json" header
  'get /*.jsmenu': function (req, res, next) {
    res.type('json');
    next();
  },

  'get /news': 'NewsController.find',

	// To route the home page to the "index" action of FooController
	// (if no controller exists, Sails will look for a view called `views/home/index.*`)
	// '/' : {
	//     controller  : 'foo',
	//     action      : 'index',
	// }

	// If you want to set up a route only for a particular HTTP method/verb
	// (GET, POST, PUT, DELETE) you can specify the verb before the path:
	// 'post /signup': {
	//		controller	: 'user',
	//		action		: 'signup'
	// }

	// Keep in mind default routes exist for each of your controllers
	// So if you have a UserController with an action called "juggle"
	// a route will be automatically exist mapping it to /user/juggle.
	//
	// Additionally, unless you override them, new controllers will have
	// create(), find(), findAll(), update(), and destroy() actions,
	// and routes will exist for them as follows:
	/*

	// Standard RESTful routing
	// (if index is not defined, findAll will be used)
	*/

	'get /': 'ProxyController.fetch',
	'get /refresh': 'refreshController.index'
};

/*
==============================================================    

    namespace.js

	This should be the first application js loaded into memory, 
	followed by the loading of config.js.

============================================================== 
*/

window.FAB = {
	Model: {},
	Collection: {},
	Util: {},
	Controller: {},
	Router: {},
	View: {
		Block: {},
		Element: {},
		Page: {}
	}
};;/*
==============================================================    

    config.js

	This should be the second application js loaded into memory, 
	followed by the loading of modules.

============================================================== 
*/

FAB.config = {};
;
FAB.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'swipe': 'swipe'
	},

	swipe: function(){
	
		console.log( 'swipe' );

	},

	index: function(){
	
		console.log( 'index, hello' );
	
	},
});;/*
==============================================================    

    app.js

	Application Entry Point. This code should be invoked after all library js 
	and application modules have loaded

============================================================== 
*/

$(document).ready(function() {
	console.log('Document Ready');
	FAB.init();
});


FAB.init = function() {

	console.log('initializing FAB');

	/* REGISTER MIXPANEL SUPER PROPERTIES, SESSION
	================================================== */
	// FAB.Helper.Metrics.registerSuperProperties({
	// 	'user_agent' : navigator.userAgent,
	// });

	// FAB.Helper.Metrics.newSession();


	/* SETUP EXPERIMENTS
	================================================== */
	// FAB.Helper.Experiment.init();


	/* START ROUTER
	================================================== */
	// Initialize Backbone Router
	
	new FAB.Router();
	Backbone.history.start();

};

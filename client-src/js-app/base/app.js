/*
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


	/* CREATE EVENTS OBJECT
	================================================== */
	this.Vent = _.extend({}, Backbone.Events);


	/* CREATE CONTROLLER VIEW
	================================================== */	
	new this.Controller();


	/* START ROUTER
	================================================== */
	new this.Router();
	Backbone.history.start();

	


	console.log( this );



};


FAB.Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'swipe': 'swipe'
	},

	swipe: function(){

		FAB.Vent.trigger('swipe');

	},

	index: function(){
	
		console.log( 'index, hello' );
	
	},
});
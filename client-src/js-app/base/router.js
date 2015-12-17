
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
});
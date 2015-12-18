FAB.Controller = Backbone.View.extend({
	el: '.page',

	initialize: function(){

		// VIEWS
		this.swipe = new FAB.View.Page.Swipe();

		console.log( 'main' );

		// EVENTS
		FAB.Vent.on('swipe', this.loadSwipe, this);

		this.render();
	
	},
	
	render: function() {

		

		return this;
	},

	loadSwipe: function(){
		
		this.$el.html(this.swipe.render().el);
		

		this.swipe.bootstrap();
	
	},

});
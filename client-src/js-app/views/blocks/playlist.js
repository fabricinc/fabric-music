FAB.View.Block.Playlist = Backbone.View.extend({
	el: '#track-list',

	initialize: function(){
	
		this.listenTo(this.collection, 'add', this.addTrack);
	
	},
	
	
	render: function() {

		

		return this;
	},

	addTrack: function(model){

		var track = new TrackView({ model: model });

		this.$el.append( track.render().el );
	
	
	},

});
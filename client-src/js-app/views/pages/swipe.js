FAB.View.Page.Swipe = Backbone.View.extend({
	el: '.page',
	tracks: [],


	initialize: function(){
	
		// VIEW ASPECTS 
		this.vent			= _.extend({}, Backbone.Events);
		this.collection		= new FAB.Collection.TrackList();
		this.playList		= new FAB.Collection.TrackList();
		// this.model			= new FAB.Model.MainModel();

		this.collection.url = 'fabricMusicAPI.php';


		// EVENT LISTENINGS
		// this.listenTo(this.model, 'change:position', this.upNext, this);
		this.listenTo(this.playList, 'add', this.addTrackToList, this);
		this.listenTo(this.collection, 'reset', this.addTracks, this);

		this.vent.on({
			'save': this.addToList,
			'pass save': this.next,
		}, this);


		// FAB.Vent.on('swipe', this.bootstrap, this);

		// this.render();

	},
	
	render: function() {

		var height	= this.$el.height();
		var width	= this.$el.width();

		console.log( 'FAB', FAB.View );
		var swipeController = new FAB.View.Element.SwipeController({ vent: this.vent });
		var playlist = new FAB.View.Block.Playlist({ collection: this.playList });



		this.$el
			.append( swipeController.render().el );
			
		swipeController.align();
		
		return this;
	},

	bootstrap: function(artistInfo){
		console.log( 'hi' );
		this.collection.fetch({ 
			data: { artistInfo: artistInfo },
			reset: true
		});

	},

	addTracks: function(){
		

		this.collection
			.slice(0,3)
			.forEach(this.renderTrack, this);


		// tell first track to listen to the mask
		// as well as play track
		this.tracks[0].listen();

		
	
	},

	renderTrack: function(track){

		var poster = new Poster({ model: track, vent: this.vent });

		this.$el.prepend( poster.render().el );

		this.tracks.push(poster);

		poster.align();

	},

	addToList: function(){

		this.playList.add(this.collection.at(0));

	},

	next: function(){

		var position = this.model.get('position');


		this.collection.shift();

		this.model.set('position', position += 1);
	
	},

	upNext: function(){

		// SET NEXT POSTER TO LISTEN TO SWIPE CONTROLLER
		var track = this.tracks[this.model.get('position')];


		if (track) {

			track.listen();
			
		}


		// LOAD POSTER IN POSITION 3
		if (this.collection.at(2)) {

			var nextTrack = this.renderTrack(this.collection.at(2));

		}
	
	},

});
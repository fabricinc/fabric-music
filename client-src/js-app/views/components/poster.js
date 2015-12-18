FAB.View.Element.Poster = Backbone.View.extend({
	className: 'swipe-poster',

	initialize: function(options){
	
		this.vent = options.vent;


		this.listenTo(this.model, 'remove', this.removeView);
		
	
	},
	
	
	render: function() {

		// var posterImg = new PosterImage({ model: this.model });

		this.el.style.backgroundImage = "url(" + this.model.get('art') + ")";

		
		return this;
	},

	start: function(e){
	
		this.start = { 
			x: e.offsetX,
			y: e.offsetY
		};
		
	
	},

	listen: function(){

		var clip = this.model.get('clip');

		clip.play();

		clip.addEventListener('ended', function () {

			// this.$el.toggleClass('paused');
			this.vent.trigger( 'trackOver' );
			clip.currentTime = 0;
		
		}.bind(this));


		// EVENTS
		this.vent.on('playPause', this.playPause, this);
		this.vent.on('realign', this.align, this);
		this.vent.on('move', this.move, this);
	
	},

	move: function(coordinates){
		
		var moveX = coordinates.x + this.position.x;
		var moveY = coordinates.y + this.position.y;

		
		this.el.style.transform = "translateX(" + moveX + "px) translateY(" + moveY + "px) rotate(" + coordinates.x / 10 +"deg)";
	
	},


	playPause: function(){
	
		var clip = this.model.get('clip');

		// this.$el.toggleClass('paused');


		if (clip.paused) {

			clip.play();

		}

		else {

			clip.pause();

		}
	
	},

	align: function(){

		if(!this.el.parentElement) { return; }


		var parentHeight	= this.el.parentElement.clientHeight;
		var parentWidth		= this.el.parentElement.clientWidth;
		var height			= this.el.offsetHeight;
		var width			= this.el.offsetWidth;

		
		var y = (parentHeight - height) / 2;
		var x = (parentWidth - width) / 2;

		this.position = {
			x: x,
			y: y,
		};

		this.el.style.transform = "translateX(" + x + "px) translateY(" + y + "px) rotate(0deg)";
	
	},

	removeView: function(){
	
		this.vent.off('playPause');
		this.model.get('clip').pause();
		this.stopListening();
		this.remove();
	
	},

});
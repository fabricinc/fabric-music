FAB.View.Element.SwipeController = Backbone.View.extend({
	className: 'swipe-controller',
	
	events: {
		'touchstart #play-control': 'playPause',
		'click #play-control': 'playPause',
		'touchstart': 'start',
		'mousedown': 'start',
		'touchmove': 'move',
		'mousemove': 'move',
		'touchend': 'stop',
		'mouseup': 'stop',
	},

	initialize: function(options){
		
		this.vent = options.vent;
		this.vent.on('trackOver', this.trackOver, this);

	},
	
	render: function() {

		this.$el.append( "<div id='play-control'></div>" );

		
		return this;
	},

	start: function(e){
		
		this.start = { 
			x: e.offsetX || Math.floor(e.originalEvent.touches[0].clientX),
			y: e.offsetY || Math.floor(e.originalEvent.touches[0].clientY)
		};
	
	},

	move: function(e){
		
		if (!e.which && e.type === "mousemove") { return; }

		// HIDE PLAY / PAUSE BUTTON
		this.$("#play-control").css({ color: 'transparent' });


		var offsetX = e.offsetX || Math.floor(e.originalEvent.touches[0].clientX),
			offsetY = e.offsetY || Math.floor(e.originalEvent.touches[0].clientY);



		var moveX = (offsetX - this.start.x),
			moveY = (offsetY - this.start.y);


		this.vent.trigger('move' ,{ x: moveX, y: moveY });		
			
	
	},

	stop: function(e){
		

		var offsetX = e.offsetX || Math.floor(e.originalEvent.changedTouches[0].clientX);
		var swipe = offsetX - this.start.x;


		if(swipe > 200) {

			this.vent.trigger('save');

		}

		else if(swipe < -200) {

			this.vent.trigger('pass');

		}

		else {

			this.vent.trigger('realign');

		}

		this.$("#play-control").css({ color: 'black' });
	
	},

	align: function(){

		var button	= this.$('#play-control');
		var left	= button.offset().left;
		var w		= this.$el.width();

		console.log( 'left', button.offsetLeft );

		this.$el.width("100%");
		button.css({ left: left, color: 'black' });

	},

	playPause: function(e){
		e.preventDefault(); e.stopPropagation();

		this.$("#play-control").toggleClass('paused');
		this.vent.trigger('playPause');
	
	},

	trackOver: function(){
	
		this.$("#play-control").toggleClass('paused');
	
	},


});
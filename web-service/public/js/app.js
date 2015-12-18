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
	Vent: {},
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
;FAB.Model.Track = Backbone.Model.extend({

	defaults: {
		publishedid: null,
		clip: null,
	},
	
	initialize: function() {

		this.set('clip', new Audio([this.get('preview')]));
		
	},

});;FAB.Collection.TrackList = Backbone.Collection.extend({

	model: FAB.Model.Track,

});;FAB.View.Block.Playlist = Backbone.View.extend({
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

});;


function hide() {
 //    document.getElementById('introinput').style.display='none';
 //     document.getElementById('intro').style.display='none';
    document.getElementById('ending').style.display='block'; 
//     document.getElementById('newsearch').style.display='block';
}

function show() {
      document.getElementById('intro').style.display='block';
      document.getElementById('newsearch').style.display='none'; 
   showResult("");       
    document.getElementById('gemForm').reset();
}

$(document).ready(function() {
  var timer;
  $("input").keyup(function() {
    clearTimeout(timer);
    var ms = 200; // milliseconds
    var val = this.value;
    timer = setTimeout(function() {
      lookup(val);
    }, ms);
  });
});


function showResult(str) {
  if (str.length===0) { 
    document.getElementById("livesearch").innerHTML="";
    document.getElementById("livesearch").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch").style.border="0px";
    }
  };
  xmlhttp.open("GET","livesearch.php?q="+str,true);
  xmlhttp.send();
}



function getGems(publishedid) {
$('#backdrop')[0].scrollIntoView();
showResult("");
document.getElementById('gemForm').reset();
 if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById("livesearch2").innerHTML=xmlhttp.responseText;
      document.getElementById("livesearch2").style.border="0px";
      hide();
    }
  };
  xmlhttp.open("GET","getgems.php?q="+publishedid,true);
  xmlhttp.send();
}

;FAB.Controller = Backbone.View.extend({
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
		

		// this.swipe.bootstrap();
	
	},

});;FAB.View.Element.Poster = Backbone.View.extend({
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

});;FAB.View.Element.SwipeController = Backbone.View.extend({
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


});;FAB.View.Page.Swipe = Backbone.View.extend({
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


		FAB.Vent.on('swipe', this.bootstrap, this);

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

		var poster = new FAB.View.Element.Poster({ model: track, vent: this.vent });

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

});;
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

FAB.Model.Track = Backbone.Model.extend({

	defaults: {
		publishedid: null,
		clip: null,
	},
	
	initialize: function() {

		this.set('clip', new Audio([this.get('preview')]));
		
	},

});
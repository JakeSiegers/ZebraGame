var GameStateObj = {};
GameStateObj.Boot = function(game) {};
GameStateObj.Boot.prototype = {
	preload: function() {
		this.load.image('preloaderBg', 'img/loading-bg.png');
		this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function() {
		//this.game.input.maxPointers = 1;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//this.game.scale.setScreenSize(true);
		this.game.stage.disableVisibilityChange = true; //prevent from pausing when not focused!
		this.game.state.start('Preloader');
	}
};
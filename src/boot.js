var GameStateObj = {};
var transitions = null

GameStateObj.Boot = function(){};
GameStateObj.Boot.prototype = {
	preload: function() {
		//this.load.image('preloaderBg', 'img/loading-bg.png');
		//this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function() {
		//this.game.input.maxPointers = 1;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;//EXACT_FIT;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//this.game.scale.setScreenSize(true);
		this.game.stage.disableVisibilityChange = true; //prevent from pausing when not focused!

		transitions = this.game.plugins.add(Phaser.Plugin.StateTransition);
		transitions.settings({
			duration: 500,
			ease: Phaser.Easing.Exponential.InOut,
			properties: {
				alpha: 0,
				scale: {
					x: 1.2,
					y: 1.2
				},
				//angle: 180
			}
		})

		//this.game.state.start('Preloader');
		transitions.to('Preloader');
	}
};

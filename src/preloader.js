GameStateObj.Preloader = function(game) {
	style = { font: "65px Arial", fill: "#000000", align: "center" };
};
GameStateObj.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#00ff00';
		this.game.add.text(0, 0, "Loading....", style);
		//this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
		this.preloadBar = this.add.sprite(0, 0, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		//this.load.image('ball', 'img/ball.png');
		//this.load.image('hole', 'img/hole.png');
		//this.load.image('element-w', 'img/element-w.png');
		//this.load.image('element-h', 'img/element-h.png');
		//this.load.image('panel', 'img/panel.png');
		//this.load.image('title', 'img/title.png');
		//this.load.image('button-pause', 'img/button-pause.png');
		//this.load.image('button-start', 'img/button-start.png');
		//this.load.image('screen-bg', 'img/screen-bg.png');
		//this.load.image('screen-mainmenu', 'img/screen-mainmenu.png');
		//this.load.image('screen-howtoplay', 'img/screen-howtoplay.png');

		//this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);

		this.load.audio('bgm', ['music/Paradisco.ogg']);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
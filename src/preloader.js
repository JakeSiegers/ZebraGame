GameStateObj.Preloader = function(game) {
	loadingPrefix = "Loading...";
	loadingText = null;
	loadingTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" };
};
GameStateObj.Preloader.prototype = {
	preload: function() {
		this.game.stage.backgroundColor = '#000000';
		loadingText = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2,loadingPrefix, loadingTextStyle);
		loadingText.anchor.set(0.5);
		this.load.onFileComplete.add(this.updateLoadText);

		//ADD ART TO LOAD HERE
		//Your loader will take care of thuis automagically.

		//this.preloadBg = this.add.sprite((320-297)/2, (480-145)/2, 'preloaderBg');
		//this.preloadBar = this.add.sprite((320-158)/2, (480-50)/2, 'preloaderBar');
		//this.load.setPreloadSprite(this.preloadBar);

		this.load.image('hills', 'img/hills.png');
		this.load.image('tree', 'img/tree.png');
		this.load.image('grass1', 'img/grass1.png');
		this.load.image('grass2', 'img/grass2.png');
		this.load.image('ground', 'img/ground.png');

		this.load.image('compass', 'img/joystickBack.png');
		this.load.image('touch_segment', 'img/joystickFront.png');
		this.load.image('touch', 'img/joystickPointer.png');

		//this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);

		//this.load.audio('bgm', ['music/Paradisco.ogg']);
	},
	create: function() {
		this.game.state.start('MainMenu');
	},
	updateLoadText: function(progress){
		loadingText.setText(loadingPrefix+"("+progress+"%)");
	}
};
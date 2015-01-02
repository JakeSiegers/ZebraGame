GameStateObj.MainMenu = function(game) {
	menuMusic = null;
	menuText = { font: "65px Arial", fill: "#000000", align: "center" };
};
GameStateObj.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#ff0000';
		//this.game.add.text(0, 0, "Main Menu", style);
		//this.add.sprite(0, 0, 'screen-mainmenu');
		//this.add.sprite((320-221)/2, 40, 'title');
		//this.startButton = this.add.button((320-146)/2, 200, 'button-start', this.startGame, this, 1, 0, 2);
		// instructions = this.game.add.text(
		// 	60, 250, "Use arrow keys on desktop, \n  accelerometer on mobile",
		// 	{ font: "16px Arial", fill: "#b921fe", stroke: "#22053a", strokeThickness: 3 }
		// );
		menuMusic = this.game.add.audio('bgm');
		console.log("Playing music");
		menuMusic.play();
	},
	/*
	startGame: function() {
		this.game.state.start('StoryHowto');
	},
	*/
	render: function() {
    	this.game.debug.soundInfo(menuMusic, 20, 32);
	}
};
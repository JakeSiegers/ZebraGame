GameStateObj.MainMenu = function(game) {
	menuMusic = null;
	menuTextStyle = { font: "65px Arial", fill: "#000000", align: "center" };
	menuText = null;

	menuHills = null;
	menuGrass1 = null;
	menuGrass2 = null;
	menuGround = null;

	count = 0;
};
GameStateObj.MainMenu.prototype = {
	create: function() {
		this.game.stage.backgroundColor = '#9ac4be';
		menuText = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "Serengeti Sprint", menuTextStyle);
		menuText.anchor.set(0.5);
		//this.add.sprite(0, 0, 'screen-mainmenu');
		//this.add.sprite((320-221)/2, 40, 'title');
		//this.startButton = this.add.button((320-146)/2, 200, 'button-start', this.startGame, this, 1, 0, 2);
		// instructions = this.game.add.text(
		// 	60, 250, "Use arrow keys on desktop, \n  accelerometer on mobile",
		// 	{ font: "16px Arial", fill: "#b921fe", stroke: "#22053a", strokeThickness: 3 }
		// );
		//menuMusic = this.game.add.audio('bgm');
		//console.log("Playing music");
		//menuMusic.play();

		menuHills = this.game.add.tileSprite(0, 360, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills');
		menuGrass1 = this.game.add.tileSprite(0, 370, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1');
		menuGround = this.game.add.tileSprite(0, 500, this.game.canvas.width, this.game.cache.getImage('ground').height, 'ground');
		menuGrass2 = this.game.add.tileSprite(0, 400, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2');

		//menuHills.anchor.set(0.5);

		// Init game controller with left thumb stick
		GameController.init({
			left: {
				type: 'joystick',
				joystick: {
					touchStart: function() {
					// Don't need this, but the event is here if you want it.
					},
					touchMove: function(joystick_details) {
						this.game.input.joystickLeft = joystick_details;
					},
					touchEnd: function() {
						this.game.input.joystickLeft = null;
					}
				}
			},
			right: {
				// We're not using anything on the right for this demo, but you can add buttons, etc.
				// See https://github.com/austinhallock/html5-virtual-game-controller/ for examples.
				type: 'none'
			}
		});
	},
	update: function(){

		count+=0.005;
		if(count>Math.PI*2){
			count=0;
		}

		scrollSpeed = Math.sin(count)*10;

		menuHills.tilePosition.x -= scrollSpeed;
		menuGrass1.tilePosition.x -= scrollSpeed*2;
		menuGround.tilePosition.x -= scrollSpeed*3;
		menuGrass2.tilePosition.x -= scrollSpeed*3;
	},
	startGame: function() {
		this.game.state.start('StoryHowto');
	},
	render: function() {
    	//this.game.debug.soundInfo(menuMusic, 20, 32);
	}
};
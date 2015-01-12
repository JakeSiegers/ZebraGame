GameStateObj.MainMenu = function(game) {};
GameStateObj.MainMenu.prototype = {
	preload: function(){
		//Init vars for this scene

		this.mm_Music = null;
		this.mm_TextStyle = { font: "65px Arial", fill: "#000000", align: "center" };
		this.mm_Text = null;

		this.mm_Hills = null;
		this.mm_Grass1 = null;
		this.mm_Grass2 = null;
		this.mm_Ground = null;

		this.mm_Count = 0;

		this.mm_ScrollSpeed  = 0;
	},
	create: function() {

		console.log(this);

		this.game.stage.backgroundColor = '#9ac4be';
		this.mm_Text = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "Serengeti Sprint", this.mm_TextStyle);
		this.mm_Text.anchor.set(0.5);
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

		this.mm_Hills = this.game.add.tileSprite(0, 360, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills');
		this.mm_Grass1 = this.game.add.tileSprite(0, 370, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1');
		this.mm_Ground = this.game.add.tileSprite(0, 500, this.game.canvas.width, this.game.cache.getImage('ground').height, 'ground');
		this.mm_Grass2 = this.game.add.tileSprite(0, 400, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2');
		//menuHills.anchor.set(0.5);

		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
		this.game.touchControl.inputEnable();
		this.game.touchControl.settings.maxDistanceInPixels = 100;

		this.game.add.text(0,0,buildInfo,{ font: "20px monospace", fill: "#000000", align: "left" });

		this.game.add.button(96, 96, 'button', function() {
			transitions.to('Game');
		}, this, 2, 1, 0);
	},
	update: function(){

		this.mm_Count+=0.005;
		if(this.mm_Count>Math.PI*2){
			this.mm_Count=0;
		}

		//transitions.to('Preloader');

		this.mm_ScrollSpeed = Math.sin(this.mm_Count)*10;

		this.mm_Hills.tilePosition.x -= this.mm_ScrollSpeed;
		this.mm_Grass1.tilePosition.x -= this.mm_ScrollSpeed*2;
		this.mm_Ground.tilePosition.x -= this.mm_ScrollSpeed*3;
		this.mm_Grass2.tilePosition.x -= this.mm_ScrollSpeed*3;
	},
	startGame: function() {
		this.game.state.start('StoryHowto');
	},
	render: function() {
    	//this.game.debug.soundInfo(menuMusic, 20, 32);
    	
	}
};
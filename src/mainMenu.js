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

		this.ground = this.game.add.group();

		this.mm_Hills = this.game.add.tileSprite(0,1440, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills');
		this.mm_Grass1 = this.game.add.tileSprite(0, 1450, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1');
		this.mm_Ground = this.game.add.tileSprite(0, 1580, this.game.canvas.width, this.game.cache.getImage('ground').height, 'ground');
		this.mm_Grass2 = this.game.add.tileSprite(0, 1480, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2');
		//menuHills.anchor.set(0.5);

		this.ground.add(this.mm_Hills);
		this.ground.add(this.mm_Grass1);
		this.ground.add(this.mm_Ground);
		this.ground.add(this.mm_Grass2);

		this.game.add.button(96, 96, 'button', function() {
			transitions.to('Game');
		}, this, 2, 1, 0);

		this.game.add.tween(this.ground).to({ y: -1000 }, 1000, Phaser.Easing.Elastic.Out, true, 500, 0);
	},
	update: function(){

		this.mm_Count+=0.005;
		if(this.mm_Count>Math.PI*2){
			this.mm_Count=0;
		}

		//transitions.to('Preloader');

		this.mm_ScrollSpeed = Math.sin(this.mm_Count)*10;

		this.ground.forEach(function(i){
			var num = this.ground.getIndex(i)+1;
			var multi = num<3?num:3; //merge 3rd and 4th layers
			i.tilePosition.x -= this.mm_ScrollSpeed*multi;
		},this);

		


	},
	render: function() {
    	this.game.debug.text(buildInfo, 32, 32);
    	
	}
};
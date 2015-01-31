GameStateObj.MainMenu = function(game) {};
GameStateObj.MainMenu.prototype = {
	preload: function(){
		//Init vars for this scene

		this.mm_Music = null;
		this.mm_TitleStyle = { font: "65px Arial", fill: "#000000", align: "center" };
		this.mm_ButtonTextStyle = { font: "30px Arial", fill: "#FFFFFF", align: "center" };
		this.mm_Title = null;

		this.mm_Hills = null;
		this.mm_Grass1 = null;
		this.mm_Grass2 = null;
		this.mm_Ground = null;

		this.mm_Count = 0;

		this.mm_ScrollSpeed  = 0;

		this.mm_startBtn = null;
	},
	create: function() {

		this.game.stage.backgroundColor = '#9ac4be';
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

		this.mm_ground = this.game.add.group();

		this.mm_Hills = this.game.add.tileSprite(0,0, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills');
		this.mm_Grass1 = this.game.add.tileSprite(0,10, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1');
		this.mm_Ground = this.game.add.tileSprite(0,140, this.game.canvas.width, this.game.cache.getImage('ground').height*5, 'ground');
		this.mm_Grass2 = this.game.add.tileSprite(0,40, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2');

		this.mm_ground.add(this.mm_Hills);
		this.mm_ground.add(this.mm_Grass1);
		this.mm_ground.add(this.mm_Ground);
		this.mm_ground.add(this.mm_Grass2);

		this.mm_ground.y=1000;

		this.mm_startBtn = this.game.add.button(this.game.canvas.width*0.25, -1000, 'button', function() {
			//this.mm_ground.y = 100;
			music = this.game.add.audio('bgm',1,true);
   			music.play('',0,1,true);
			this.hidePosition();
			setTimeout(function(){
				transitions.to('Game');
			},1000);
		}, this, 2, 1, 0);
		var btnText = new Phaser.Text(this.game, 0, 0, "START", this.mm_ButtonTextStyle)
		btnText.anchor.set(0.5);
		this.mm_startBtn.addChild(btnText);
		this.mm_startBtn.anchor.set(0.5);

		this.mm_helpBtn = this.game.add.button(this.game.canvas.width*0.50, -1000, 'button', function() {
			this.helpPosition();
		}, this, 2, 1, 0);
		var btnText = new Phaser.Text(this.game, 0, 0, "HOW TO PLAY", this.mm_ButtonTextStyle)
		btnText.anchor.set(0.5);
		this.mm_helpBtn.addChild(btnText);
		this.mm_helpBtn.anchor.set(0.5);

		this.mm_creditsBtn = this.game.add.button(this.game.canvas.width*0.75, -1000, 'button', function() {
			this.creditsPosition();
		}, this, 2, 1, 0);
		var btnText = new Phaser.Text(this.game, 0, 0, "WHO MADE THIS?", this.mm_ButtonTextStyle)
		btnText.anchor.set(0.5);
		this.mm_creditsBtn.addChild(btnText);
		this.mm_creditsBtn.anchor.set(0.5);

		this.mm_backBtn = this.game.add.button(200, -1000, 'button', function() {
			this.startPosition();
		}, this, 2, 1, 0);
		var btnText = new Phaser.Text(this.game, 0, 0, "GO BACK", this.mm_ButtonTextStyle)
		btnText.anchor.set(0.5);
		this.mm_backBtn.addChild(btnText);
		this.mm_backBtn.anchor.set(0.5);

		this.mm_credits = this.game.add.sprite(0,this.game.canvas.height,'creditsScreen');
		this.mm_how2play = this.game.add.sprite(0,this.game.canvas.height,'how2playScreen');

		this.mm_Title = this.game.add.text(this.game.canvas.width/2,-1000, "Serengeti Sprint", this.mm_TitleStyle);
		this.mm_Title.anchor.set(0.5);

		this.startPosition();
	},
	update: function(){

		this.mm_Count+=0.005;
		if(this.mm_Count>Math.PI*2){
			this.mm_Count=0;
		}

		this.mm_ScrollSpeed = Math.sin(this.mm_Count)*10;

		this.mm_ground.forEach(function(i){
			var num = this.mm_ground.getIndex(i)+1;
			var multi = num<3?num:3; //merge 3rd and 4th layers
			i.tilePosition.x -= this.mm_ScrollSpeed*multi;
		},this);

	},
	render: function() {
    	this.game.debug.text(buildInfo, 32, 32);
	},
	hidePosition:function(){
		this.game.add.tween(this.mm_ground).to({ y: this.game.canvas.height}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_Title).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_startBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_helpBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_creditsBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
	},
	startPosition:function(){
		this.game.add.tween(this.mm_ground)
		.to({ y: this.game.canvas.height }, 500, Phaser.Easing.Exponential.InOut)
		.to({ y: this.game.canvas.height-350 }, 1000, Phaser.Easing.Exponential.InOut)
		.start();

		this.game.add.tween(this.mm_Title).to({ y: this.game.canvas.height/2 ,alpha:1}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_startBtn).to({ y: this.game.canvas.height*0.75 ,alpha:1}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_helpBtn).to({ y: this.game.canvas.height*0.75 ,alpha:1}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_creditsBtn).to({ y: this.game.canvas.height*0.75 ,alpha:1}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);

		this.game.add.tween(this.mm_backBtn).to({ y: -1000,alpha:0 }, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);

		this.game.add.tween(this.mm_how2play).to({ y: this.game.canvas.height }, 500, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_credits).to({ y: this.game.canvas.height }, 500, Phaser.Easing.Exponential.InOut, true, 0, 0);
	},
	helpPosition:function(){
		this.game.add.tween(this.mm_ground)
		.to({ y: this.game.canvas.height }, 500, Phaser.Easing.Exponential.InOut)
		.to({ y: 0 }, 1000, Phaser.Easing.Exponential.InOut)
		.start();

		this.game.add.tween(this.mm_Title).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_startBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_helpBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_creditsBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);

		this.game.add.tween(this.mm_how2play).to({ y: 0 }, 1000, Phaser.Easing.Exponential.InOut, true, 500, 0);

		this.game.add.tween(this.mm_backBtn).to({ y: 100 ,alpha:1 }, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
	},
	creditsPosition:function(){
		this.game.add.tween(this.mm_ground)
		.to({ y: this.game.canvas.height }, 500, Phaser.Easing.Exponential.InOut)
		.to({ y: 0 }, 1000, Phaser.Easing.Exponential.InOut)
		.start();

		this.game.add.tween(this.mm_Title).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_startBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_helpBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.mm_creditsBtn).to({ y: -1000 ,alpha:0}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);

		this.game.add.tween(this.mm_credits).to({ y: 0 ,alpha:1}, 1000, Phaser.Easing.Exponential.InOut, true, 500, 0);

		this.game.add.tween(this.mm_backBtn).to({ y: 100 ,alpha:1}, 1000, Phaser.Easing.Exponential.InOut, true, 0, 0);
	}
};
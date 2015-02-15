GameStateObj.Preloader = function(game) {};
GameStateObj.Preloader.prototype = {
	init:function(){
		this.pl_loadingPrefix = "Loading...";
		this.pl_loadingText = null;
		this.pl_loadingTextStyle = { font: "65px Arial", fill: "#ffffff", align: "center" };

		this.pl_loadingText = this.game.add.text(this.game.canvas.width/2, this.game.canvas.height/2,this.pl_loadingPrefix, this.pl_loadingTextStyle);
		this.pl_loadingText.anchor.set(0.5);
	},
	preload: function() {

		this.stage.backgroundColor = '#000000';

		this.load.onFileComplete.add(this.updateLoadText,this);

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

		this.load.image('creditsScreen', 'img/credits.png');
		this.load.image('how2playScreen', 'img/how2play.png');

		this.load.image('compass', 'img/joystickBack.png');
		this.load.image('touch_segment', 'img/joystickFront.png');
		this.load.image('touch', 'img/joystickPointer.png');

		this.load.spritesheet('button', 'img/buttons.png', 285, 74);
		this.load.spritesheet('squareButton', 'img/SquareButtons.png', 74, 74);

		this.load.image('giraffeHead', 'img/giraffeHead.png');
		this.load.image('giraffeNeck', 'img/giraffeNeck.png');
		this.load.image('giraffeBody', 'img/giraffeBody.png');

		this.load.image('sun', 'img/sun.png');

		this.load.image('scoreBoard', 'img/scoreBoard.png');

		this.load.atlas('enemyBullet','img/enemies/bullet/bullet.png','img/enemies/bullet/bullet.json');

		//this.load.spritesheet('button-audio', 'img/button-audio.png', 35, 35);

		//this.load.audio('bgm', ['music/188854_Team_Rocket_Battle.ogg']);
	},
	create: function() {
		//this.game.state.start('MainMenu');
		//this.pl_startBtn = this.game.add.button(this.game.canvas.width/2, this.game.canvas.height/4, 'button', function() {
			
		//}, this, 2, 1, 0);
		//this.pl_startBtn.anchor.set(0.5);

		setTimeout(function(){
			transitions.to('MainMenu');
		},100);
		
	},
	updateLoadText: function(progress){ //for whatever reason objects aren't created yet?
		this.pl_loadingText.setText(this.pl_loadingPrefix+"("+progress+"%)");
	}
};
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

		this.load.image('hills', 'assets/img/hills.png');
		this.load.image('tree', 'assets/img/tree.png');
		this.load.image('grass1', 'assets/img/grass1.png');
		this.load.image('grass2', 'assets/img/grass2.png');
		this.load.image('ground', 'assets/img/ground.png');

		this.load.image('creditsScreen', 'assets/img/credits.png');
		this.load.image('how2playScreen', 'assets/img/how2play.png');

		this.load.image('compass', 'assets/img/joystickBack.png');
		this.load.image('touch_segment', 'assets/img/joystickFront.png');
		this.load.image('touch', 'assets/img/joystickPointer.png');

		this.load.spritesheet('button', 'assets/img/buttons.png', 285, 74);
		this.load.spritesheet('squareButton', 'assets/img/SquareButtons.png', 74, 74);

		this.load.image('giraffeHead', 'assets/img/giraffeHead.png');
		this.load.image('giraffeNeck', 'assets/img/giraffeNeck.png');
		this.load.image('giraffeBody', 'assets/img/giraffeBody.png');

		this.load.image('sun', 'assets/img/sun.png');

		this.load.image('scoreBoard', 'assets/img/scoreBoard.png');

		this.load.atlas('enemyBullet','assets/img/enemies/bullet/bullet.png','assets/img/enemies/bullet/bullet.json');

		this.load.bitmapFont("mainFont", "assets/fonts/font.png", "assets/fonts/font.fnt");

		//this.load.spritesheet('button-audio', 'assets/img/button-audio.png', 35, 35);

		//this.load.audio('bgm', ['assets/music/188854_Team_Rocket_Battle.ogg']);
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
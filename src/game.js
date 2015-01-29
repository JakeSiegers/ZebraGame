GameStateObj.Game = function(game) {};
GameStateObj.Game.prototype = {
	init: function(indata){

		this.g_groundGroup;

		this.g_head;

		this.g_headX = 300; //Relative to ground!
		this.g_headY = -160; //Relative to ground!

		this.g_gameSpeed = 0; //max 1

		this.g_count = 0;

		this.g_started = false;
		this.g_score = 0;
		this.g_totalTraveled = 0;
		this.g_scoreText;

		this.g_TutTextStyle = { font: "65px Arial", fill: "#000000", align: "center" };
		this.g_ScoreTextStyle = { font: "20px Arial", fill: "#FFFFFF", align: "center" };

	},
	create: function() {

		this.game.stage.backgroundColor = "#9ac4be";

		//===========================================================================
		//Extra Background / Sun
		//===========================================================================

		this.g_sun = this.add.sprite(this.game.canvas.width/2, this.game.canvas.height/2, 'sun');
		this.g_sun .anchor.set(0.5,0.5);

		//===========================================================================
		//Touch Joystick
		//===========================================================================

		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
		this.game.touchControl.inputEnable();
		this.game.touchControl.settings.maxDistanceInPixels = 100;

		this.game.touchControl.speed.x;
		this.game.touchControl.speed.y;

		//===========================================================================
		//Giraffe
		//===========================================================================

		this.g_giraffeGroup = this.game.add.group();

		this.g_giraffeHead = this.add.sprite(this.g_headX, this.g_headY, 'giraffeHead');
		this.g_giraffeHead.anchor.set(0.3,1);

		this.g_giraffeNeckJoints = [];
		this.g_giraffeNeckJoints.push(new Phaser.Point(this.g_headX, this.g_headY+160));
		this.g_giraffeNeckJoints.push(new Phaser.Point(0, 0));

		this.g_giraffeNeck = this.game.add.rope(0,0,'giraffeNeck', null, this.g_giraffeNeckJoints);

		this.g_giraffeBody = this.add.sprite(this.g_headX, this.g_headY+150, 'giraffeBody');
		this.g_giraffeBody.anchor.set(0.715,0);


		this.g_giraffeGroup.add(this.g_giraffeHead);
		this.g_giraffeGroup.add(this.g_giraffeNeck);
		this.g_giraffeGroup.add(this.g_giraffeBody);

		//===========================================================================
		//Ground
		//===========================================================================

		this.g_groundGroup = this.game.add.group();

		this.g_groundGroup.add(this.game.add.tileSprite(0,0, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills'));
		this.g_groundGroup.add(this.game.add.tileSprite(0,10, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1'));
		this.g_groundGroup.add(this.g_giraffeGroup);
		this.g_groundGroup.add(this.game.add.tileSprite(0,140, this.game.canvas.width, this.game.cache.getImage('ground').height*5, 'ground'));
		this.g_groundGroup.add(this.game.add.tileSprite(0,40, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2'));

		this.g_groundGroup.y=1000;
		

		//===========================================================================
		//ScoreBoard
		//===========================================================================

		this.g_scoreBoardGroup = this.game.add.group();
		this.g_scoreText = this.game.add.text(25,10,"scoreBoard",this.g_ScoreTextStyle);
		//this.g_scoreBoardGroup.add();
		this.g_scoreBoardGroup.add(this.game.add.sprite(0,0,"scoreBoard"));
		this.g_scoreBoardGroup.add(this.g_scoreText);
		this.g_scoreBoardGroup.x = 30;
		this.g_scoreBoardGroup.y = -1000;
		//===========================================================================
		//Mini Tutorial
		//===========================================================================

		this.g_TutText = this.game.add.text(this.game.canvas.width/2,-1000,"[Default Text]", this.g_TutTextStyle);
		this.g_TutText.anchor.set(0.5);
		this.showTutorialText(["Welcome to the Serengeti!","Use the touch screen to control your head","Avoid hitting your head into anything!","Lets Begin!"],function(){
			this.startPosition();
			this.g_started = true;
		},this);

		

	},
	update:function(){

		this.g_count += this.g_gameSpeed/1000;
		if(this.g_count>Math.PI*2){
			this.g_count = 0;
		}

		this.increaseGameSpeed();

		this.g_groundGroup.forEach(function(i){
			var num = this.g_groundGroup.getIndex(i)+1;
			if(num == 3){return;} //The Giraffe
			var multi = num<3?num:3; //merge 3rd and 4th layers
			i.tilePosition.x -= this.g_gameSpeed*10*multi;
		},this);

		this.g_giraffeHead.x = this.g_headX - this.game.touchControl.speed.x*2;
		this.g_giraffeHead.y = this.g_headY - this.game.touchControl.speed.y*2;


		this.g_giraffeNeckJoints[1].y = this.g_giraffeHead.y-10;
		this.g_giraffeNeckJoints[1].x = this.g_giraffeHead.x;

		this.g_sun.x = this.game.canvas.width/2 + Math.sin(this.g_count)*500;
		this.g_sun.y = this.game.canvas.height/2 + Math.cos(this.g_count)*500;

		this.g_scoreText.setText("Speed = "+(Math.round(this.g_gameSpeed * 100) / 100)+"\nScore = ");
	},
	render:function(){
		var zx = this.g_giraffeHead.world.x;
		var zy = this.g_giraffeHead.world.y;
		var zw = this.g_giraffeHead.width;
		var zh = this.g_giraffeHead.height;

		//this.game.debug.text("X: "+zx+" Y:"+zy, 32, 32);
		//this.game.debug.geom(new Phaser.Rectangle(zx-zw/2,zy-zh/2,zw,zh), 'rgba(255,0,0,0.3)' ) ;
	},
	increaseGameSpeed:function(){
		if(this.g_started == false){
			return;
		}
		if(this.g_gameSpeed<5){
			this.g_gameSpeed += 0.0001;
		}
	},
	startPosition:function(){
		this.game.add.tween(this.g_groundGroup)
			.to({ y: this.game.canvas.height-250 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
		this.game.add.tween(this.g_scoreBoardGroup)
			.to({ y: 30 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
	},
	//Texts must be an array. Will loop through all of them at speed.
	showTutorialText:function(texts,endCallBack,endCallBackScope){
		this.g_TutText.setText(texts[0]);
		this.g_TutText.y = -1000;
		this.game.add.tween(this.g_TutText)
			.to({ y: 300 }, 500, Phaser.Easing.Exponential.InOut,false)
			.to({ y: 1000 }, 500, Phaser.Easing.Exponential.InOut,false,1000)
			.start()
			.onComplete.add(function(){
				texts.shift();
				if(texts.length > 0){
					this.showTutorialText(texts,endCallBack,endCallBackScope);
				}else{
					endCallBack.call(endCallBackScope);
				}
			}, this);
	}
};
GameStateObj.Game = function(game) {};
GameStateObj.Game.prototype = {
	init: function(indata){

		this.g_groundGroup;

		this.g_head;

		this.g_headX = 300; //Relative to ground!
		this.g_headY = -160; //Relative to ground!

		this.g_gameSpeed = 0; //max 1

		this.g_count = 0;

		this.g_score = 0;

	},
	create: function() {

		this.game.stage.backgroundColor = '#9ac4be';

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
		this.g_scoreBoardGroup.add();

		this.startPosition();

	},
	update:function(){
		this.g_count += 0.01;
		if(this.g_count>Math.PI*2){
			this.g_count = 0;
		}
		temp = this.g_headY+150 + Math.sin(this.g_count)*80; // = this.add.sprite(this.g_headX, this.g_headY+150, 'giraffeBody');


		if(this.g_gameSpeed<1){
			this.g_gameSpeed += 0.01;
		}

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
	},
	render:function(){
		//this.game.debug.text(this.game.touchControl.speed.x, 32, 32);
		/*this.g_groundGroup.forEach(function(i){
			this.game.debug.spriteBounds(i);
		},this);
		*/
	},

	startPosition:function(){
		this.game.add.tween(this.g_groundGroup)
		.to({ y: this.game.canvas.height-250 }, 1000, Phaser.Easing.Exponential.InOut)
		.start();

		/*this.game.add.tween(this.g_giraffeGroup)
		.to({ y: 0}, 1000, Phaser.Easing.Exponential.InOut)
		.start();*/
	}
};
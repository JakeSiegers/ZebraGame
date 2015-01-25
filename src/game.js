GameStateObj.Game = function(game) {};
GameStateObj.Game.prototype = {
	init: function(indata){

		this.g_ground;

		this.g_head;

		this.g_headX = 300;
		this.g_headY = 300;

		this.g_headOffsetX = 0;
		this.g_headOffsetY = 0;

		this.g_gameSpeed = 1; //max 10?

	},
	create: function() {

		this.game.stage.backgroundColor = '#9ac4be';

		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
		this.game.touchControl.inputEnable();
		this.game.touchControl.settings.maxDistanceInPixels = 100;

		this.game.touchControl.speed.x;
		this.game.touchControl.speed.y;

		this.g_giraffeGroup = this.game.add.group();

		this.g_giraffeHead = this.add.sprite(this.g_headX, this.g_headY, 'giraffeHead');
		this.g_giraffeHead.anchor.set(0.3,1);

		this.points = [];
		this.points.push(new Phaser.Point(this.g_headX, this.g_headY+160));
		this.points.push(new Phaser.Point(0, 0));

		this.g_giraffeNeck = this.game.add.rope(0,0,'giraffeNeck', null, this.points);

		this.g_giraffeBody = this.add.sprite(this.g_headX, this.g_headY+150, 'giraffeBody');
		this.g_giraffeBody.anchor.set(0.715,0);


		this.g_giraffeGroup.add(this.g_giraffeHead);
		this.g_giraffeGroup.add(this.g_giraffeNeck);

		this.g_ground = this.game.add.group();

		this.g_ground.add(this.game.add.tileSprite(0,0, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills'));
		this.g_ground.add(this.game.add.tileSprite(0,10, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1'));
		this.g_ground.add(this.game.add.tileSprite(0,140, this.game.canvas.width, this.game.cache.getImage('ground').height*5, 'ground'));
		this.g_ground.add(this.game.add.tileSprite(0,40, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2'));

		this.g_ground.y=1000;

		this.startPosition();

	},
	update:function(){
		if(this.g_gameSpeed<50){
			this.g_gameSpeed += 0.1;
		}

		this.g_ground.forEach(function(i){
			var num = this.g_ground.getIndex(i)+1;
			var multi = num<3?num:3; //merge 3rd and 4th layers
			i.tilePosition.x -= this.g_gameSpeed*multi;
		},this);

		this.g_giraffeHead.x = this.g_headX - this.game.touchControl.speed.x*2;
		this.g_giraffeHead.y = this.g_headY - this.game.touchControl.speed.y*2;


		this.points[1].y = this.g_giraffeHead.y-10;
		this.points[1].x = this.g_giraffeHead.x;
	},
	render:function(){
		this.game.debug.text(this.game.touchControl.speed.x, 32, 32);
	},
	startPosition:function(){
		console.log(this.g_ground);
		this.game.add.tween(this.g_ground)
		.to({ y: this.game.canvas.height }, 500, Phaser.Easing.Exponential.InOut)
		.to({ y: this.game.canvas.height-250 }, 1000, Phaser.Easing.Exponential.InOut)
		.start();
	}
};
GameStateObj.LevelSelect = function(game) {};
GameStateObj.LevelSelect.prototype = {
	init: function(debugMode){
		this.ls_groundGroup;
		this.ls_levelButtonGroup;
		this.ls_ButtonTextStyle = { font: "30px Arial", fill: "#FFFFFF", align: "center" };

		this.ls_levelsPerRow = 5;
		this.ls_levels = 2;
	},
	create: function(){
		//===========================================================================
		//Ground
		//===========================================================================

		this.ls_groundGroup = this.game.add.group();
		this.ls_groundGroup.add(this.game.add.tileSprite(0,0, this.game.canvas.width, this.game.cache.getImage('hills').height, 'hills'));
		this.ls_groundGroup.add(this.game.add.tileSprite(0,10, this.game.canvas.width, this.game.cache.getImage('grass1').height, 'grass1'));
		this.ls_groundGroup.add(this.game.add.tileSprite(0,140, this.game.canvas.width, this.game.cache.getImage('ground').height*2, 'ground'));
		this.ls_groundGroup.add(this.game.add.tileSprite(0,40, this.game.canvas.width, this.game.cache.getImage('grass2').height, 'grass2'));

		this.ls_groundGroup.y=1000;

		//===========================================================================
		//Level Select Buttons
		//===========================================================================
		this.ls_levelButtonGroup = this.game.add.group();
		for(var i=1;i<=this.ls_levels;i++){
			//(screenW/(numCards+1))*i
			var btn = this.game.add.button((this.game.canvas.width/(this.ls_levelsPerRow+1))*i, 0, 'squareButton', function(){
				this.hidePosition();
				setTimeout(function(){
					transitions.to('Game',null,true,{level:i});
				},1000);
			}, this, 2, 1, 0);
			var btnText = new Phaser.Text(this.game, 0, 0, "L"+i, this.ls_ButtonTextStyle)
			btnText.anchor.set(0.5);
			btn.addChild(btnText);
			btn.anchor.set(0.5);
			this.ls_levelButtonGroup.add(btn);
		}
		this.ls_levelButtonGroup.y = -1000;


		this.startPosition();
	},
	update: function(){

	},
	startPosition:function(){
		this.game.add.tween(this.ls_groundGroup)
			.to({ y: this.game.canvas.height-250 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
		this.game.add.tween(this.ls_levelButtonGroup)
			.to({ y: this.game.canvas.height/2 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
	},
	hidePosition:function(){
		this.game.add.tween(this.ls_groundGroup)
			.to({ y: 1000}, 1000, Phaser.Easing.Exponential.InOut)
			.start();
		this.game.add.tween(this.ls_levelButtonGroup)
			.to({ y: -1000 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
	}
};
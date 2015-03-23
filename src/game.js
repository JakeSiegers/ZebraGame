GameStateObj.Game = function(game) {};
GameStateObj.Game.prototype = {
	init: function(debugMode){

		this.g_groundGroup;

		this.g_head;

		this.g_headX = 300; //Relative to ground!
		this.g_headY = -160; //Relative to ground!

		this.g_gameSpeed = 0; //max 1
		this.g_gameSpeedMulti = 1;

		this.g_tutTextSpeed = 1000;

		this.g_count = 0;

		this.g_started = false;
		this.g_score = 0;
		this.g_totalTraveled = 0;
		this.g_scoreText;

		this.g_TutTextStyle = { font: "65px Arial", fill: "#000000", align: "center" };
		this.g_ScoreTextStyle = { font: "20px Arial", fill: "#FFFFFF", align: "left" };
		this.g_ButtonTextStyle = { font: "30px Arial", fill: "#FFFFFF", align: "center" };

		this.g_enemies = new Array();

		if(debugMode == true){
			this.g_gameSpeedMulti = 10;
			this.g_tutTextSpeed = 0;
		}
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
		
		this.game.touchControl.settings.maxDistanceInPixels = 100;

		this.game.touchControl.speed.x;
		this.game.touchControl.speed.y;

		//===========================================================================
		//Giraffe
		//===========================================================================

		this.g_giraffeGroup = this.game.add.group();

		this.g_giraffeHead = this.add.sprite(this.g_headX, this.g_headY, 'giraffeHead');
		this.g_giraffeHead.anchor.set(0.3,1);
		this.game.physics.enable(this.g_giraffeHead,Phaser.Physics.ARCADE);
		//this.g_giraffeHead.body.velocity.x = 50 + Math.random() * 100;

		this.g_giraffeNeckJoints = [];
		this.g_giraffeNeckJoints.push(new Phaser.Point(this.g_headX, this.g_headY+160));
		this.g_giraffeNeckJoints.push(new Phaser.Point(0, 0));

		this.g_giraffeNeck = this.game.add.rope(0,0,'giraffeNeck', null, this.g_giraffeNeckJoints);
		this.g_giraffeNeckJoints[1].x = this.g_giraffeHead.x;

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
		this.g_groundGroup.add(this.game.add.tileSprite(0,140, this.game.canvas.width, this.game.cache.getImage('ground').height*2, 'ground'));
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
		this.g_scoreBoardGroup.x = 1050;
		this.g_scoreBoardGroup.y = -1000;
		//===========================================================================
		//Mini Tutorial
		//===========================================================================

		this.g_TutText = this.game.add.text(this.game.canvas.width/2,-1000,"[Default Text]", this.g_TutTextStyle);
		this.g_TutText.anchor.set(0.5);
		this.showTutorialText(["Welcome to the Serengeti!","Use the touch screen to control your head","Avoid hitting your head into anything!","The game gets faster as you play","Lets Begin!"],function(){
			this.startPosition();
			this.g_started = true;
			//this.game.touchControl.inputEnable();
		},this);

		//===========================================================================
		//Back Button
		//===========================================================================
		this.g_backBtn = this.game.add.button(200, -1000, 'button', function() {
			this.hidePosition();
			setTimeout(function(){
				transitions.to('MainMenu',null,true);
			},1000);
		}, this, 2, 1, 0);
		var btnText = new Phaser.Text(this.game, 0, 0, "Main Menu", this.g_ButtonTextStyle)
		btnText.anchor.set(0.5);
		this.g_backBtn.addChild(btnText);
		this.g_backBtn.anchor.set(0.5);

	},
	update:function(){

		

		this.g_count += this.g_gameSpeed/1000;
		if(this.g_count>Math.PI*2){
			this.g_count = 0;
		}

		this.updateEnemies();
		this.increaseGameSpeed();
		this.updateGiraffePosition();

		this.g_groundGroup.forEach(function(i){
			var num = this.g_groundGroup.getIndex(i)+1;
			if(num == 3){return;} //The Giraffe
			var multi = num<3?num:3; //merge 3rd and 4th layers
			i.tilePosition.x -= this.g_gameSpeed*10*multi;
		},this);

		

		this.g_sun.x = this.game.canvas.width/2 + Math.sin(this.g_count)*400;
		this.g_sun.y = this.game.canvas.height/2 + Math.cos(this.g_count)*-400;

		this.g_scoreText.setText("Speed = "+(Math.round(this.g_gameSpeed * 100) / 100)+"(x"+this.g_gameSpeedMulti+")\nScore = "+this.g_score);

	},
	render:function(){

		game.debug.pointer(game.input.pointer1);
    	game.debug.pointer(game.input.pointer2);

		//this.game.debug.body(this.g_giraffeHead, 'rgba(255,0,0,0.3)');

		//this.game.debug.geom(new Phaser.Rectangle(this.game.input.worldX-5,this.game.input.worldY-5,10,10), 'rgb(0,0,255)' ) ;
	},
	updateGiraffePosition:function(){
		if(this.g_started == false){
			return;
		}
		//We cannot move this with the group, so we must do it seperately.
		this.g_giraffeHead.body.y = this.smoothMove(this.g_giraffeHead.body.y,this.game.input.worldY-this.g_giraffeHead.height/2);
		//Keeps the neck on, becuse groups do that
		this.g_giraffeGroup.x = this.smoothMove(this.g_giraffeGroup.x,this.game.input.worldX-this.g_giraffeGroup.width);
		//Keep neck attached!
		this.g_giraffeNeckJoints[1].y = this.g_giraffeHead.y-10;
		
	},
	smoothMove:function(from,to){
		var temp;
		if(from<to)
		temp=(from+(0.1*Math.abs(from-to)));
		else
		temp=(from-(0.1*Math.abs(from-to)));
		return Math.ceil(temp);
	},
	increaseGameSpeed:function(){
		if(this.g_started == false){
			return;
		}

		var scoreLastFrame = this.g_score;
		this.g_totalTraveled += this.g_gameSpeed;
		this.g_score = Math.round(this.g_totalTraveled/10);
		if(this.g_score!=scoreLastFrame){
			if(this.g_score %5 == 0 || this.g_score == 2){
				this.spawnEnemy();
			}
		}

		if(this.g_gameSpeed<5){
			this.g_gameSpeed += 0.0001*this.g_gameSpeedMulti;
		}
	},
	spawnEnemy:function(){
		var e = this.game.add.sprite(this.game.world.width, Math.random()*this.game.world.height, 'enemyBullet','bulletbill1.png');
		e.animations.add('main', [
			'bulletbill1.png',
			'bulletbill2.png',
			'bulletbill3.png',
			'bulletbill4.png',
			'bulletbill5.png',
			'bulletbill6.png',
		], 10, true, false);
    	e.animations.play('main');
    	this.game.physics.arcade.enable(e);
		this.g_enemies.push(e);
	},
	updateEnemies:function(){
		for(i in this.g_enemies){
			this.game.physics.arcade.collide( this.g_enemies[i], this.g_giraffeHead, this.damage, this.damage, this);
			this.g_enemies[i].x -= 15*this.g_gameSpeed;
			if(this.g_enemies[i].y>this.g_giraffeHead.world.y-20){
				this.g_enemies[i].y-=0.5*this.g_gameSpeed;
			}
			if(this.g_enemies[i].y<this.g_giraffeHead.world.y-20){
				this.g_enemies[i].y+=0.5*this.g_gameSpeed;
			}
			if(this.g_enemies[i].x<-100){
				this.g_enemies[i].destroy();
			}
		}
	},
	damage:function(enemy,head){
		this.game.stage.backgroundColor = '#992d2d';
		console.log("damage!");
		enemy.destroy();
		this.g_started = false;
		this.game.add.tween(this.g_backBtn).to({ y: 100 ,alpha:1}, 500, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.add.tween(this.g_giraffeGroup).to({x:this.g_giraffeGroup.x-100,alpha:0}, 500, Phaser.Easing.Exponential.InOut, true, 0, 0);
		this.game.touchControl.inputDisable();
	},
	startPosition:function(){
		this.game.add.tween(this.g_groundGroup)
			.to({ y: this.game.canvas.height-250 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
		this.game.add.tween(this.g_scoreBoardGroup)
			.to({ y: 30 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
	},
	hidePosition:function(){
		this.game.add.tween(this.g_groundGroup)
			.to({ y: 1000}, 1000, Phaser.Easing.Exponential.InOut)
			.start();
		this.game.add.tween(this.g_scoreBoardGroup)
			.to({ y: 1000 }, 1000, Phaser.Easing.Exponential.InOut)
			.start();
		this.game.add.tween(this.g_backBtn).to({ y: 1000}, 500, Phaser.Easing.Exponential.InOut, true, 0, 0);
	},
	//Texts must be an array. Will loop through all of them at speed.
	showTutorialText:function(texts,endCallBack,endCallBackScope){
		this.g_TutText.setText(texts[0]);
		this.g_TutText.y = -1000;
		this.game.add.tween(this.g_TutText)
			.to({ y: 300 }, 100, Phaser.Easing.Exponential.InOut,false)
			.to({ y: 1000 }, 100, Phaser.Easing.Exponential.InOut,false,this.g_tutTextSpeed)
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
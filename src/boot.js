var GameStateObj = {};
var transitions = null

GameStateObj.Boot = function(){};
GameStateObj.Boot.prototype = {
	preload: function() {
		//this.load.image('preloaderBg', 'img/loading-bg.png');
		//this.load.image('preloaderBar', 'img/loading-bar.png');
	},
	create: function() {
		//this.game.input.maxPointers = 1;
		this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;//SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		//this.game.scale.setScreenSize(true);
		this.game.stage.disableVisibilityChange = true; //prevent from pausing when not focused!

		transitions = this.game.plugins.add(Phaser.Plugin.StateTransition);
		transitions.settings({
			duration: 500,
			ease: Phaser.Easing.Exponential.InOut,
			properties: {
				alpha: 0,
				scale: {
					x: 1.2,
					y: 1.2
				},
				//angle: 180
			}
		})

		//this.game.state.start('Preloader');
		transitions.to('Preloader');
	}
};

LabelButton = function(game, x, y, key, label, callback, callbackContext, overFrame, outFrame, downFrame, upFrame)
{
    Phaser.Button.call(this, game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    //Style how you wish...
    this.style = {
        'font': '10px Arial',
        'fill': 'black'
    };
    this.label = new Phaser.Text(game, 0, 0, "Label", this.style);
    this.addChild(this.label);
    this.setLabel("Label");
};
LabelButton.prototype = Object.create(Phaser.Button.prototype);
LabelButton.prototype.constructor = LabelButton;

LabelButton.prototype.setLabel = function(label)
{
    this.label.setText(label)
    this.label.x = Math.floor((this.width - this.label.width)*0.5);
    this.label.y = Math.floor((this.height - this.label.height)*0.5);
};
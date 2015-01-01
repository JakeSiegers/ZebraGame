var game = new Phaser.Game(640, 1136, Phaser.AUTO, '',{init:init,create:create});

function init(){
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignVertically = true;
	game.scale.pageAlignHorizontally = true;

	if (game.device.desktop === false) {
	//	game.scale.forceOrientation(true, false);
	//	game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this); 
	//	game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
	}

}

var oText;

function create(){
	var text = "Hello There!";
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    oText = game.add.text(game.world.centerX-300, 0, text, style);
}

function enterIncorrectOrientation(){
	oText.setText("Woah, Please point me up!");
}

function leaveIncorrectOrientation(){
	oText.setText("Ok, we're good!");
}


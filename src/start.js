(function() {
	var game = new Phaser.Game(1280,720, Phaser.CANVAS, '');
	game.state.add('Boot', GameStateObj.Boot);
	game.state.add('Preloader', GameStateObj.Preloader);
	game.state.add('MainMenu', GameStateObj.MainMenu);
	game.state.add('Game', GameStateObj.Game);
	game.state.start('Boot');
})();
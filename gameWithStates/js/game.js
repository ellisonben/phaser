var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-with-states-div');

//add all the states to the game 
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);

//once states are added, start the game by calling the boot state
game.state.start('boot');

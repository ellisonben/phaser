var menuState = {
    
    create: function () {
        var nameLabel = game.add.text(80, 80, 'Game with states', 
                            {font: '50px Arial', fill: '#ffffff'});
        
        var instructionsLabel = game.add.text(80, game.world.height-80, 'press SPACEBAR to start', 
                            {font: '30px Courier', fill: '#ffffff'});
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        spaceKey.onDown.addOnce(this.start, this);
    },
        
    start: function () {
        //load play state
        game.state.start('play');
    },
};

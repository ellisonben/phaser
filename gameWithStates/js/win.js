var winState = {

    create: function () {
        var winLabel = game.add.text(80, 80, 'Winner!', 
                            {font: '50px Arial', fill: '#ffffff'});
        var startLabel = game.add.text(80, game.world.height-80, 
                            'press SPACEBAR to return to menu', 
                            {font: '25px Arial', fill: '#ffffff'});
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        spaceKey.onDown.addOnce(this.restart, this);
    },
    
    restart: function() {
        game.state.start('menu');
    },
}

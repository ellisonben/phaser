//load assets and then call the menu state

var loadState = {
    preload: function () {
        //add loading label to the screen
        var loadingLabel = game.add.text(80, 150, 'loading ...', 
                        {font: '30px Courier', fill: '#ffffff'});
        //load assets
        game.load.image('player', 'assets/player.png');
        game.load.image('win', 'assets/win.png');
    },
    
    create: function () {
        //calls menu state
        game.state.start('menu');
    }
};

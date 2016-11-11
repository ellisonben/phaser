//this state will start the physics system and then call the load state

var bootState = {
    //create is automatically called
    create: function() {
        //the game will use the arcade physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //call the load state
        game.state.start('load');
    }
};

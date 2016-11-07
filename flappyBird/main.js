// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        //load bird sprite
        game.load.image('bird', 'assets/bird.png');
        //load pipe sprite
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() { 
        //set background colour (blue)
        game.stage.backgroundColor = '#71c5cf';
        
        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        //Bird
        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');
        
        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);
        
        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 800; 
        
        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);
        
        //changes centre of rotation for jump animation
        this.bird.anchor.setTo(-0.2, 0.5);
        
        //Pipes
        // Create an empty group
        this.pipes = game.add.group(); 
        
        // create a column of pipes every 1.5 seconds
        this.timer = game.time.events.loop(1500, this.addColumnOfPipes, this); 

        
        //Print score in the top left in white
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" });        
        
    },

    update: function() {
        // This function is called 60 times per second    
        // It contains the game's logic
        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 490) {
            this.restartGame();
        }
        
        //in the result of a collision with a pipe restart the game
        game.physics.arcade.overlap(
            this.bird, this.pipes, this.restartGame, null, this); 
            
        //cause bird to tilt forwards into dive if not tilted
        if (this.bird.angle < 20) {
            this.bird.angle += 1;
        }
    },
    
    jump: function() {
        //changes the bird's velocity to negative (upwards) 300
        this.bird.body.velocity.y = -300;
        
        //bird tilt animation
        var animation = game.add.tween(this.bird);
        
        //change the angle of the bird to -20 over 100ms
        animation.to({angle: -20}, 100);
        
        //start animation
        animation.start();
    },
    
    addOnePipe: function(x, y) {
        //loads a pipe sprite at position (x,y)
        var pipe = this.game.add.sprite(x, y, 'pipe');
        //adds to pipes group - create function
        this.pipes.add(pipe);
        //enable physics on the pipe
        game.physics.arcade.enable(pipe);
        //gives pipe leftward velocity so that it goes across screen
        pipe.body.velocity.x = -200;
        //kill the pipe once it is out of view
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },
    
    
    addColumnOfPipes: function() {
        //randomly assign hole position
        var hole = Math.floor(Math.random() *5) + 1;
        
        //add the six pipes with hole at position 'hole' and 'hole+1'
        for (var i=0; i < 8; i++) {
            if (i != hole && i != hole + 1) {
                this.addOnePipe(400, i*60 + 10);
            } 
        }
        
        //increment score
        this.score += 1;
        this.labelScore.text = this.score;
    },
    
    restartGame: function() {
        // starting the main state again will restart the game
        game.state.start('main');
    }
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(400, 490);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');

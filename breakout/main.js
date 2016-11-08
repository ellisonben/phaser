var mainState = {
    preload: function() {
        //load the paddle
        game.load.image('paddle', 'assets/paddle.png');
        
        //load brick sprite
        game.load.image('brick', 'assets/brick.png');
        
        //load ball sprite
        game.load.image('ball', 'assets/ball.png');
    },
    
    create: function() {
        //set background colour
        game.stage.backgroundColor = '#99ccff';
        
        //start arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //add physics engine to all of the game objects
        game.world.enableBody = true;
        
        
        //paddle
        //create the left/right arrow keys
        this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        
        //add the paddle at the bottom of the screen
        this.paddle = game.add.sprite(200, 400, 'paddle');
        
        //make sure the paddle won't move when the paddle hits the ball
        this.paddle.body.immovable = true;
        
        
        //bricks
        //create a group that will hold all of the bricks
        this.bricks = game.add.group();
        
        //add 5 x 5 bricks to the group
        for (var i=0; i<5; i++) {
            for (var j=0; j<5; j++) {
                //create the bricks at the appropriate position
                var brick = game.add.sprite(65+i*60, 55+j*35, 'brick');
                //bricks don't move when hit by ball
                brick.body.immovable = true;
                //add brick to the group
                this.bricks.add(brick);
            }
        }
        
        
        //ball
        //add the ball
        this.ball = game.add.sprite(200, 300, 'ball');
        
        //assign initial velocity to ball
        this.ball.body.velocity.x = 300;
        this.ball.body.velocity.y = 300;
        
        //make ball bounce
        this.ball.body.bounce.setTo(1);
        this.ball.body.collideWorldBounds = true;
        
        //give the ball gravity
        this.ball.body.gravity.y = 150; 
    },
    
    update: function() {
        //paddle
        //move the paddle left/right when an arrow key is pressed
        if (this.left.isDown) {
            this.paddle.body.velocity.x = Math.max(-500, this.paddle.body.velocity.x - 60);
        } else if (this.right.isDown) {
            this.paddle.body.velocity.x = Math.min(500, this.paddle.body.velocity.x + 60);
        } else {
            this.paddle.body.velocity.x = 0;
        }
        
        //collisions
        //add collisions between ball and paddle
        game.physics.arcade.collide(this.paddle, this.ball, this.paddleHit, null, this);
        
        //call the hit function when ball hits brick
        game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);
        
        //restart the game if the ball is below the paddle
        if (this.ball.y > this.paddle.y) {
            game.state.start('main');
        }
        
    },
    
    paddleHit: function() {
        this.ball.body.velocity.x += this.paddle.body.velocity.x / 5;
    },
    
    //removes brick from game when hit by ball - called on collision
    hit: function(ball, brick) {
        brick.kill();
    },
}

var game = new Phaser.Game(400, 450);
game.state.add('main', mainState);
game.state.start('main');



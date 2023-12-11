class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.spritesheet('run', 'Player/run.png', {
            frameWidth: 45,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 1,
        });
        this.load.spritesheet('jump', 'Player/jump.png', {
            frameWidth: 65,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 3,
        });
        this.load.spritesheet('slash', 'Player/slash.png', {
            frameWidth: 58,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 3,
        });
        this.load.spritesheet('enemy', 'enemy.png', {
            frameWidth: 90,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 1,
        });
        this.load.spritesheet('obstacle', 'obstacle.png', {
            frameWidth: 50,
            frameHeight: 85,
            startFrame: 0, 
            endFrame: 1,
        });
        this.load.spritesheet('fireDeath', 'Player/fireDeath.png', {
            frameWidth: 60,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 2,
        });
        this.load.spritesheet('death', 'Player/death.png', {
            frameWidth: 43,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 3,
        });
        this.load.image('sky', 'Background/sky.png');
        this.load.image('back', 'Background/background.png');
        this.load.image('fore', 'Background/foreground.png');
        this.load.image('floor', 'Background/floor.png');

        // load image for particle emitter
        this.load.image('white', 'white.png');

        

        this.gameOver = false;
    }

    create() {
        this.music = game.sound.add('music');
        this.music.loop = true;
        this.music.play();
        
        
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        this.sky = this.add.image(0, 0, 'sky').setOrigin(0);
        this.back = this.add.tileSprite(0, 0, 960, 800, 'back').setOrigin(0);
        this.fore = this.add.tileSprite(0, 0, 960, 800,'fore').setOrigin(0);

        // add ui bar
        this.add.rectangle(0, 0, game.config.width, borderUISize * 2, 0x000000).setOrigin(0, 0);

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        score = 0;
        this.scoreText = this.add.text(borderUISize + borderPadding, borderUISize, 'Score: ' + score, this.scoreConfig);
        
        // display high score
        this.highScoreText = this.add.text(borderUISize + borderPadding*35, borderUISize, 'High Score: ' + highScore, this.scoreConfig);

        // timer text
        this.runTime = 0;
        this.timer = 0;
        this.totalTime = 0;
        this.timerText = this.add.text(borderUISize + borderPadding*19, borderUISize, "Time: 0", this.scoreConfig);
        
        this.floor = this.physics.add.sprite(0, game.config.height - borderUISize*3.1, 'floor').setOrigin(0);
        this.floor.setImmovable();
        this.floorImg = this.add.tileSprite(0, game.config.height - borderUISize*3.1, 960, 800, 'floor').setOrigin(0);
        
        this.player = new Player(this, 25, game.config.height - borderUISize*6.2, 'run').setOrigin(0);
        this.player.scale = 3;
        this.player.setGravityY(500);

        this.physics.add.collider(this.player, this.floor, () => {
            if (!this.gameOver && !this.player.isRunning) {
                this.player.endJump();
                this.player.setGravityY(500);
            }
        });
        
        // animation config
        this.anims.create({
            key: 'runAnim',
            frames: this.anims.generateFrameNumbers('run', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            yoyo: true,
            repeat: -1
        });
        this.player.anims.play('runAnim');

        this.anims.create({
            key: 'jumpUp',
            frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 1, first: 0}),
            frameRate: 3,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpDown',
            frames: this.anims.generateFrameNumbers('jump', {start: 2, end: 3, first: 2}),
            frameRate: 4,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'slashAnim',
            frames: this.anims.generateFrameNumbers('slash', {start: 0, end: 3, first: 0}),
            frameRate: 8,
            repeat: 0
        });
        this.anims.create({
            key: 'fireDeathAnim',
            frames: this.anims.generateFrameNumbers('fireDeath', {start: 0, end: 2, first: 0}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'deathAnim',
            frames: this.anims.generateFrameNumbers('death', {start: 0, end: 3, first: 0}),
            frameRate: 1,
            repeat: 0
        });

        // add enemies 
        this.enemy01 = new Enemy(this, game.config.width - borderUISize*5, game.config.height - borderUISize*6.8, 'enemy').setOrigin(0);
        this.enemy01.scale = 3;

        this.rand = Phaser.Math.Between(100, game.config.height - borderUISize*6.8);
        this.enemy02 = new Enemy(this, game.config.width + 200, this.rand, 'enemy').setOrigin(0);
        this.enemy02.scale = 3;

        this.enemies = [ this.enemy01, this.enemy02 ];

        this.physics.add.overlap(this.player, this.enemies, () => {
            if (!this.gameOver) {
                this.player.anims.play('deathAnim');
                this.player.isRunning = false;
                this.sound.play('sfx_death');
                this.totalTime = this.runTime;
                this.gameOver = true;
                this.music.stop();
            }
        });

        this.obstacle = new Obstacle(this, game.config.width / 3, game.config.height - borderUISize*6.8, 'obstacle').setOrigin(0);
        this.obstacle.scale = 3;

        this.physics.add.overlap(this.player, this.obstacle, () => {
            if (!this.gameOver) {
                this.player.anims.play('fireDeathAnim');
                this.player.isRunning = false;
                this.sound.play('sfx_death');
                this.totalTime = this.runTime;
                this.gameOver = true;
                this.music.stop();
            }
        });

        // animation configs
        this.anims.create({
            key: 'enemyAnim',
            frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            yoyo: true,
            repeat: -1
        });
        this.anims.create({
            key: 'obstacleAnim',
            frames: this.anims.generateFrameNumbers('obstacle', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            yoyo: true,
            repeat: -1
        });
        this.enemy01.anims.play('enemyAnim');
        this.enemy02.anims.play('enemyAnim');
        this.obstacle.anims.play('obstacleAnim');
    }

    update(time, delta) {
        //console.log(this.player.x);
        // check if the game is over
        if (!this.gameOver) {
            this.player.update();
            this.enemy01.update();
            this.enemy02.update();
            this.obstacle.update();
            
            // parallax scrolling
            this.back.tilePositionX += 0.5;
            this.fore.tilePositionX += 1.5;
            this.floorImg.tilePositionX += 2.25;
        }
        else {
            this.deathDelay = this.time.delayedCall(1000, () => {
                this.obstacle.setVelocityX(0);
            });

            this.scoreConfig.fixedWidth = 0;
            this.scoreConfig.backgroundColor = '##F3B141';
            this.scoreConfig.color = '#843605';
            this.add.text(game.config.width/2, game.config.height/2 - 64, 'The Darkness Consumes You...', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2, 'You survived for ' + this.totalTime + ' seconds.', this.scoreConfig).setOrigin(0.5);
            this.scoreConfig.backgroundColor = '#00FF00';
            this.scoreConfig.color = '#000';
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or Down Arrow for Menu', this.scoreConfig).setOrigin(0.5);
            if (score > highScore) {
                highScore = score;
                this.highScoreText.text = 'High Score: ' + highScore;
            }
            this.runTime = 0;
        }

        // Update timer every second
        this.timer += delta;
        while (!this.gameOver && this.timer > 1000) {
            this.runTime += 1;
            this.timer -= 1000;
            this.timerText.text = "Time: " + this.runTime;
            this.enemy01.movementSpeed += 5;
            this.enemy02.movementSpeed += 5;
            this.obstacle.movementSpeed += 5;
        }

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            score = 0;
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start('menuScene');
        }

        // check sword collisions
        if (!this.gameOver && keySpace.isDown) {
            
            if (!this.player.isSlashing) {
                this.sound.play('sfx_slash');
                this.player.isSlashing = true;
            }
            
            if (this.checkSwordCollision(this.player, this.enemy01)) {
                this.emitParticles(this.enemy01);
                this.sound.play('sfx_enemy_pain');
                this.rand = Phaser.Math.Between(100, game.config.height - borderUISize*6.8);
                this.enemy01.reset(this.rand);
                score += 25;
                this.scoreText.text = 'Score: ' + score;
            }
            if (this.checkSwordCollision(this.player, this.enemy02)) {
                this.emitParticles(this.enemy02);
                this.sound.play('sfx_enemy_pain');
                this.rand = Phaser.Math.Between(100, game.config.height - borderUISize*6.8);
                this.enemy02.reset(this.rand);
                score += 25;
                this.scoreText.text = 'Score: ' + score;
            }
        }

        if (!this.gameOver && keyDOWN.isDown) {
            this.player.setGravityY(1250);
        }
        
    }
    // particle emitter function
    emitParticles(enemy) {
        let particles = this.add.particles(enemy.x + 90, enemy.y + 125, 'white', {
            speed: 200,
            lifespan: 500,
            scale: { start: 2.5, end: 0, ease: 'sine.out' },
            gravityY: 50,
            acceleration: true
        });
        particles.explode(5);
    }

    // check for sword collision
    checkSwordCollision(player, enemy) {
        if (player.x < enemy.x && enemy.x < player.x + 175 && enemy.y < player.y + player.height + 65 && enemy.height + enemy.y > player. y - 65) {
            return true;
        } 
        else {
            return false;
        }
    }
}
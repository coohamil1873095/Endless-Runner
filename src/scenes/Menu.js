class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.path = './assets/';
        this.load.spritesheet('idle', 'Player/idle.png', {
            frameWidth: 50,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 1,
        });
        this.load.spritesheet('enemy', 'enemy.png', {
            frameWidth: 90,
            frameHeight: 75,
            startFrame: 0, 
            endFrame: 1,
        });
        this.load.image('sky', 'Background/sky.png');
        this.load.image('back', 'Background/background.png');
        this.load.image('fore', 'Background/foreground.png');
        this.load.image('floor', 'Background/floor.png');
    }

    create() {
        // change background color
        //this.cameras.main.setBackgroundColor('#FFFFFF')
        let sky = this.add.image(0, 0, 'sky').setOrigin(0);
        sky.scaleX = 2;
        let back = this.add.image(0, 0, 'back').setOrigin(0);
        //back.scaleX = 2;
        let fore = this.add.image(0, 0, 'fore').setOrigin(0);
        //fore.scaleX = 2;
        let floor = this.add.sprite(0, game.config.height - borderUISize*3.1, 'floor').setOrigin(0);

        this.add.rectangle(0, 0, game.config.width, borderUISize * 2, 0x000000).setOrigin(0, 0);

        // animation config
        this.anims.create({
            key: 'idleAnim',
            frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            yoyo: true,
            repeat: -1
        });

        let idle = this.add.sprite(25, game.config.height - borderUISize*6.8, 'idle').setOrigin(0);
        idle.scale = 3;
        idle.anims.play('idleAnim');

        // animation config
        this.anims.create({
            key: 'enemyAnim',
            frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 1, first: 0}),
            frameRate: 2,
            yoyo: true,
            repeat: -1
        });

        let enemy = this.add.sprite(game.config.width - borderUISize*5, game.config.height - borderUISize*6.8, 'enemy').setOrigin(0);
        enemy.scale = 3;
        enemy.anims.play('enemyAnim');

        // menu text
        let menuConfig = {
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
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize, 'Score: ' + score, menuConfig);
        
        // display high score
        this.highScoreText = this.add.text(borderUISize + borderPadding*35, borderUISize, 'High Score: ' + highScore, menuConfig);

        // timer text
        this.timerText = this.add.text(borderUISize + borderPadding*19, borderUISize, "Time: 0", menuConfig);

        // show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Light and Dark', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Press Up Arrow to Jump and Space to Attack', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press Space To Start', menuConfig).setOrigin(0.5);
        
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // this.add.rectangle(enemy.x+40, enemy.y + 125, 10, 10, 0x000000);
        // this.add.rectangle(idle.x+idle.width+40, idle.y + 125, 10, 10, 0x000000);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('playScene');
        }
    }



}
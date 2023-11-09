class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    create() {

        // change background color
        this.cameras.main.setBackgroundColor('#000000');

        // text config
        let creditsConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show credits text
        this.add.text(game.config.width/2, game.config.height/10, 'Credits', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/6, 'Music:', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/6 + 32, 'https://pixabay.com/music/upbeat-omw-to-kick-the-big-bad-electronic-heroic-theme-song-145340/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3, 'SFX:', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 32, 'https://freesound.org/people/Fupicat/sounds/475347/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 64, 'https://freesound.org/people/Michel88/sounds/76966/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 96, 'https://freesound.org/people/Xupr_e3/sounds/686523/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 128, 'https://freesound.org/people/Breviceps/sounds/445974/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 160, 'https://freesound.org/people/wesleyextreme_gamer/sounds/574821/', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 256, 'All other assets made by me using GIMP 2.10.34', creditsConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/3 + 320, 'Press C to Return to Menu', creditsConfig).setOrigin(0.5);


        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.scene.start('menuScene');
        }
    }
}
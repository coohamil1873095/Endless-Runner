// Enemy prefab
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Enemy to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width / 2.5, this.height / 2.5);
        this.body.setOffset(10, 35);

        this.movementSpeed = 150;

        this.sfxSlurp = scene.sound.add('sfx_slurp');
    }

    update() {
        this.setVelocityX(this.movementSpeed * -1);

        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width * 2) {
            let rand = Phaser.Math.Between(100, game.config.height - borderUISize*6.8);
            this.sfxSlurp.play();
            this.reset(rand);
        }
    }

    reset(random) {
        this.x = game.config.width;
        this.y = random;
    }
}
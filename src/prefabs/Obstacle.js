// Obstacle prefab
class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Obstacle to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width / 2.75, this.height / 2.5);
        this.body.setOffset(20, 40);

        this.movementSpeed = 150;
    }

    update() {
        this.setVelocityX(this.movementSpeed * -1);

        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width * 2) {
            this.reset();
        }
    }

    reset() {
        this.x = game.config.width;
    }
}
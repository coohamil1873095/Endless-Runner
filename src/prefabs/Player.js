// Player prefab
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        this.body.setSize(this.width / 2.5, this.height / 2.5);
        this.body.setOffset(25, 25);
        
        this.isRunning = true;
        this.isSlashing = false;
        this.isJumping = false;
        this.jumpSpeed = 500;

        

        this.sfxJump = scene.sound.add('sfx_jump'); 
    }

    update() {
        // jump movement
        if (keyUP.isDown && !this.isJumping && !this.isSlashing && this.y > game.config.height / 2) {
            this.sfxJump.play();
            this.isJumping = true;
            this.isRunning = false;
            this.body.setVelocityY(this.jumpSpeed * -1);
            this.body.setOffset(15, 30);
        }
        
        if (this.isJumping && !this.isSlashing) {
            if (this.body.velocity.y < 0 && this.anims.currentAnim.key != 'jumpUp') {
                this.anims.play('jumpUp');
            }
            else if (this.body.velocity.y > 0 && this.anims.currentAnim.key != 'jumpDown') {
                this.anims.play('jumpDown');
            }
        }

        if (this.isSlashing) {
            if (this.anims.currentAnim.key != 'slashAnim') {
                this.anims.play('slashAnim');
                this.once('animationcomplete', () => {
                    this.isSlashing = false;
                    this.anims.play('runAnim');
                })
            }
        }

    }

    endJump() {
        this.isJumping = false;
        this.isRunning = true;
        this.anims.play('runAnim');
        this.body.setOffset(25, 25);
    }
}
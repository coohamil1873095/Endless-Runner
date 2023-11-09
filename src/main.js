//-----------------------------------------------------------------------------
// 
// Connor Hamilton 
//
//
//-----------------------------------------------------------------------------


let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 800,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            //gravity: {y: 500},
            debug: true
        }
    },
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySpace, keyUP, keyR, keyDOWN;

let highScore = 0;
let score = 0;
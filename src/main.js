//-----------------------------------------------------------------------------
// Connor Hamilton 
// coohamil
// Approx Hours: 25
//
// Light and Dark
//
// Creative Tilt:
// This game was a class project. One technically interesting aspect was the sword collision, which required other workarounds since I wasn't using a state machine.
// I looked to the Phaser API for answers regarding the physics, audio, and particle systems.
// This game has a bleak visual style with simple pixel art. With my lack of pixel art experience, I noticed that my animations were looking smoother as this game's development continued.
// Most notably, the player running animation versus the player slashing and death animations.
// For this project, my biggest challenges were learning the Phaser framework and creating the visual assets.
//
// Credits:

// Music:
// https://pixabay.com/music/upbeat-omw-to-kick-the-big-bad-electronic-heroic-theme-song-145340/
//
// SFX:
// https://freesound.org/people/Fupicat/sounds/475347/ 
// https://freesound.org/people/Michel88/sounds/76966/
// https://freesound.org/people/Xupr_e3/sounds/686523/
// https://freesound.org/people/Breviceps/sounds/445974/
// https://freesound.org/people/wesleyextreme_gamer/sounds/574821/
//
// All other assets made by me using GIMP 2.10.34
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
    scene: [ Menu, Credits, Play ]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keySpace, keyUP, keyR, keyDOWN, keyC;

let highScore = 0;
let score = 0;
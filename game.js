var config = {
    type: Phaser.AUTO,
    width: 1920,
    height:1080,
    parent: game,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);
var worldWidth = 9600;

function preload() {
    this.load.image('fon', 'assets/fon.png');
    this.load.image('fon 1','assets/fon 1.jpg');


}
function create() {
   
    this.add.image(0, 0, 'fon').setOrigin(0,0);
    this.add.image(0, 0, 'fon').setOrigin(0,0);
    this.add.tileSprite(0, 0, worldWidth, 1080, "fon 1").setOrigin(0, 0);
    platforms = this.physics.add.staticGroup();
    for (var x=0; x< worldWidth; x=x + 384) {console.log(x)
    
    }


}




function update() {
   
}
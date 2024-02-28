var config = {
    type: Phaser.AUTO,
    //збільшення екрану
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
//розмір світу
var worldWidth = 9600;

function preload() {
    this.load.image('fon', 'assets/fon.png');
    //фон
    this.load.image('fon 1','assets/fon 1.jpg');
    //платформа
    this.load.image('platform','assets/platform.png');
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});

}
function create() {
   //створення фону
    this.add.tileSprite(0, 0, worldWidth, 1080, "fon 1").setOrigin(0, 0);
    platforms = this.physics.add.staticGroup();
    for (var x=0; x< worldWidth; x=x + 384) {console.log(x)
        //створення платформи
    platforms.create(x, 1080 - 128, 'platform').setOrigin(0,0).refreshBody();
    }

    //створення гравця
    player = this.physics.add.sprite(1500, 900, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

    // Налаштування камери
    this.camera.main.setBounds(0, 0, worldWidth, 1080);
    this.physics.world.setBounds(0, 0, worldWidth, 1080);

    // Слідкування камери за гравцем
    this.camera.main.startFollow(player);

    //Колізія гравця та платформ
    this.physics.add.collider(player, platforms);

     
}




function update() {
   
}
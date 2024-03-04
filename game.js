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
    this.load.image('Crate','assets/Crate.png');
    this.load.image('Tree','assets/Tree.png');
    this.load.image('TombStone (1)','assets/TombStone (1).png');
    this.load.image('TombStone (2)','assets/TombStone (2).png');
    this.load.image('star','assets/star.png');
    
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
    this.cameras.main.setBounds(0,0, worldWidth, 1080);
    this.physics.world.setBounds(0,0, worldWidth, 1080);

    // Слідкування камери за гравцем
    this.cameras.main.startFollow(player);

    //Колізія гравця та платформ
    this.physics.add.collider(player, platforms);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
     cursors = this.input.keyboard.createCursorKeys();
     this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });
    function collectStar(player, star) {
        star.disableBody(true, true);
    }
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    var score = 0;
    var scoreText;

   

            
   

     
}




function update() {
 
    if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }




}
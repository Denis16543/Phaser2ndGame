var config = {
    type: Phaser.AUTO,
    //збільшення екрану
    width: 1920,
    height:1080,
    parent: game,
    playerSpeed:1000, 
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
var life = 5
var player
var stars
var platforms
var cursors
var score = 0
var scoreText
var gameOver = false
var playerSpeed = 10
var worldWidth = config.width * 10

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
    this.load.image('14','assets/14.png');
    this.load.image('15','assets/15.png');
    this.load.image('16','assets/16.png');
    this.load.image('Bush','assets/Bush.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('Idle', 'assets/Idle.png', {frameWidth: 32, frameHeight: 48});
}
function create() {
   //створення фону
    this.add.tileSprite(0, 0, worldWidth, 1080, "fon 1").setOrigin(0, 0);
    platforms = this.physics.add.staticGroup();
    for (var x=0; x< worldWidth; x=x + 384) {
        //console.log(x)
        //створення платформи
    platforms
    .create(x, 1080 - 128, 'platform')
    .setOrigin(0,0)
    .refreshBody();
    }
  
//створення дикорацій
    platforms.create(1200, 900, 'Crate');
    platforms.create(3000, 900, 'Crate');
    platforms.create(2000, 900, 'Crate');


     //створення ворога
     Idle = this.physics.add.sprite(600, 200, 'Idle');
     Idle.setBounce(0.2);
     Idle.setCollideWorldBounds(false);
 
   




    //створення гравця
    player = this.physics.add.sprite(500, 200, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

    // Налаштування камери
    this.cameras.main.setBounds(0,0, worldWidth, 1080);
    this.physics.world.setBounds(0,0, worldWidth, 1080);

    // Слідкування камери за гравцем
    this.cameras.main.startFollow(player);

    //Колізія гравця та платформ
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(Idle, platforms);

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

    Bush = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x= x + Phaser.Math.FloatBetween(500, 1000)){


        Bush.create(x, 1080 - 128, 'Bush')
        .setOrigin(0,1)
        .setScale(Phaser.Math.FloatBetween(0.5, 2))
        .setDepth(Phaser.Math.Between(1, 10));
        



      
    }
    

    

   
  
    function collectStar(player, star) {
        star.disableBody(true, true);
    }
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    var score = 0;
    var scoreText;
    function collectStar(player, star) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: 0' + score);

        }
  

   




//Рахунок 
scoreText = this.add.text(100 , 100 , 'Score: 0', {fontSize: '20px', fill: '#FFF'})
.setOrigin(0, 0)
.setScrollFactor(0)


//Життя
lifeText = this.add.text(1500, 100, showLife(), { fontSize: '40px', fill: '#FFF'})
.setOrigin(0, 0)
.setScrollFactor(0)


//Кнопка перезапуску гри
var resetButtor = this.add.text(100, 150, 'reset', {fontSize: '40px', fill: '#ccc'})
.setInteractive()
.setScrollFactor(0);

resetButtor.on('pointerdown' , function () {
    console.log('restart')
    refreshBody()

});

for (var x = 0; x< worldWidth; x = x + Phaser.Math.Between(256,500)){
    var y = Phaser.Math.Between(128,810)

    platforms.create(x, y, 'platform')
    var i
    for(i = 1; i<=Phaser.Math.Between(1,5); i++){
        platforms.create(x +128 * i, y, 'platform')
    }
    platforms.create(x + 128 * i, y, 'platform')
}



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
function hitBomb(player, bomb) {
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}

//Формування смуги життя
function showLife() {
    var lifeLine = ''

    for (var i = 0; i < life; i++) {
        lifeLine = lifeLine + '🤍'
        // lifeLine += '❤'
        //console.log(life)
    }
    return lifeLine



 







}
//Перезапуск гри
function refreshBody() {
    console.log('game over')
    location.reload()
    //this.scene.restart();
};

//Відпрацювання колізії гравця та бомб
function hitBomb(player , bomb) {
    //this.physics.pause();
    bomb.disableBody(true, true);
    player.setTint(0xff0000);
    life -= 1
    lifeText.setText(showLife())

    console.log('boom')
    player.anims.play('turn');
    if (life == 0) gameOver = true;
}

 //Створення бомби
 var x = Phaser.Math.Between(0, worldWidth);
 var y = Phaser.Math.Between(0, config.height);
 var bomb = bomb.create(x, 0, 'bomb');
 bomb.setScale(0.25);
 bomb.setBounce(1);
 bomb.setCollideWorldBounds(true);
 bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
 
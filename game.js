var config = {
    type: Phaser.AUTO,
    //збільшення екрану
    width: 1920,
    height: 1080,
    parent: game,
    playerSpeed: 1000,
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
var scoreText;
var enemyCount = 10;
var gameOver = false
var playerSpeed = 10
var worldWidth = config.width * 10

function preload() {
    this.load.image('fon', 'assets/fon.png');
    //фон
    this.load.image('fon 1', 'assets/fon 1.jpg');
    //платформа
    this.load.image('platform', 'assets/platform.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('Crate', 'assets/Crate.png');
    this.load.image('Tree', 'assets/Tree.png');
    this.load.image('TombStone (1)', 'assets/TombStone (1).png');
    this.load.image('TombStone (2)', 'assets/TombStone (2).png');
    this.load.image('star', 'assets/star.png');
    this.load.image('14', 'assets/14.png');
    this.load.image('15', 'assets/15.png');
    this.load.image('16', 'assets/16.png');
    this.load.image('Bush', 'assets/Bush.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('enemy', 'assets/Idle.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('life', 'assets/life.png');
}
function create() {
    //створення фону
    this.add.tileSprite(0, 0, worldWidth, 1080, "fon 1").setOrigin(0, 0);
    platforms = this.physics.add.staticGroup();
    for (var x = 0; x < worldWidth; x = x + 384) {
        //console.log(x)
        //створення платформи
        platforms
            .create(x, 1080 - 128, 'platform')
            .setOrigin(0, 0)
            .refreshBody();
    }

    //створення дикорацій
    platforms.create(1200, 900, 'Crate');
    platforms.create(3000, 900, 'Crate');
    platforms.create(2000, 900, 'Crate');

    //створення гравця
    player = this.physics.add.sprite(500, 200, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

    // Налаштування камери
    this.cameras.main.setBounds(0, 0, worldWidth, 1080);
    this.physics.world.setBounds(0, 0, worldWidth, 1080);

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
    
    //
    stars = this.physics.add.group({
        key: 'star',
        repeat: 140,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });




    // function collectStar(player, star) {
    //     star.disableBody(true, true);
    // }


    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    var score = 0;
    var scoreText;

    Bush = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + Phaser.Math.FloatBetween(500, 1000)) {


        Bush.create(x, 1080 - 128, 'Bush')
            .setOrigin(0, 1)
            .setScale(Phaser.Math.FloatBetween(0.5, 2))
            .setDepth(Phaser.Math.Between(1, 10));





    }






    function collectStar(player, star) {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.setScale(0.1,0.1)
        }
    }
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    bombs = this.physics.add.group();

    this.physics.add.collider(bombs, platforms);

    this.physics.add.collider(player, bombs, hitBomb, null, this);








    //Рахунок 
    scoreText = this.add.text(100, 100, 'Score: 0', { fontSize: '20px', fill: '#FFF' })
        .setOrigin(0, 0)
        .setScrollFactor(0)


    //Життя
    lifeText = this.add.text(1500, 100, showLife(), { fontSize: '40px', fill: '#FFF' })
        .setOrigin(0, 0)
        .setScrollFactor(0)


    //Кнопка перезапуску гри
    var resetButtor = this.add.text(100, 150, 'reset', { fontSize: '40px', fill: '#ccc' })
        .setInteractive()
        .setScrollFactor(0);

    resetButtor.on('pointerdown', function () {
        console.log('restart')
        refreshBody()

    });
    //Створення платформ
    for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(600, 800)) {

        var y = Phaser.Math.Between(500, 800)

        platforms.create(x, y, '14')
        var i
        for (i = 1; i <= Phaser.Math.Between(0, 3); i++) {
            platforms.create(x + 128 * i, y, '15')
        }
        platforms.create(x + 128 * i , y, '16')
    }
    


    //Додаємо ворогів випадковим чином 

    enemy = this.physics.add.group({
        key: 'enemy',
        repeat: enemyCount,
        setXY: { x: 1000, y: 300, stepX: Phaser.Math.FloatBetween(300, 500) }
    });

    enemy.children.iterate(function (child) {
        child
            .setCollideWorldBounds(true).
            setVelocityX(Phaser.Math.FloatBetween(-500, 500))
            .setScale(0.3);

    });

    //Кількість ворогів
    enemyText = this.add.text(300, 50, showTextSymbols('💀', enemyCount), { fontSize: '40px', fill: '#FFF' }).setOrigin(0, 0).setScrollFactor(0)
     
    //Колізія ворогів та гравця
    this.physics.add.collider(player , enemy, () => {

        player.x = player.x + Phaser.Math.FloatBetween(-200, 200);
    }, null, this); 
    this.physics.add.collider(enemy, platforms);  

    life = this.physics.add.group({
        key: 'life',
        repeat: 10,
        setXY: { x: 1000, y: 300, stepX: Phaser.Math.FloatBetween(300, 500) }
    });

    life.children.iterate(function (child) {
        child
            .setCollideWorldBounds(true);

    });
    


}





function update() {

    if (cursors.left.isDown) {
        player.setVelocityX(-320);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(320);

        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    //Зміна напрянку руху ворога
     enemy.children.iterate((child) => {
        if (Math.random() < 0.01) {
            child.setVelocityX(Phaser.Math.FloatBetween(-500, 500))
        }
     })


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



function collectHeart(player, heart){
    heart.disableBody(true, true);
    life += 1;
    lifeText.setText(showLife());
    console.log(life)




}

//Перезапуск гри
function refreshBody() {
    console.log('game over')
    location.reload()
    //this.scene.restart();
};

//Відпрацювання колізії гравця та бомб
function hitBomb(player, bomb) {
    //this.physics.pause();
    bomb.disableBody(true, true);
    player.setTint(0xff0000);
    life -= 1
    lifeText.setText(showLife())

    console.log('boom')
    player.anims.play('turn');
    if (life == 0) gameOver = true;
}
//Формування смуги символів
function showTextSymbols(symbol, count) {
    var symbolLine = ''

    for (var i = 0; i < count; i++) {
        symbolLine = symbolLine + symbol
    }

    return symbolLine
}



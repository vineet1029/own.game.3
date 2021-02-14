var PLAY = 1;
var END = 0
var gameState = 1;

var monkey, monkey_run, ground, groundI, ground2;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var beatenSound, bananaSound;
var gameOver, gameOverI;


function preload() {


  monkey_run = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  groundI = loadImage("jungle.jpg")
  gameOverI = loadImage("GameOver.png")

  beatenSound = loadSound("Rockslide.mp3");
  bananaSound = loadSound("banana_sound.mp3");

}



function setup() {
  createCanvas(800, 800);

  var survivalTime = 0;

  //creating monkey
  monkey = createSprite(150, 265, 20, 20);
  monkey.addAnimation("monkey", monkey_run);
  // monkey.addImage(bananaImage)
  monkey.scale = 0.2;


  ground = createSprite(200, 400, 600, 10);
  ground.addImage(groundI);
  ground.scale = 2;
  ground.velocityX = -10



  ground2 = createSprite(300, 800, 600, 10)
  ground2.visible = false;

  gameOver = createSprite(400, 400)
  gameOver.addImage("gameOver", gameOverI);
  gameOver.scale = 0.3;


  monkey.collide(ground2);

  FoodGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {

   text("Score: "+ score, 500,50);



  if (gameState === PLAY) {

    gameOver.visible = false;

    if (keyDown("space") && monkey.y >= 160) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 1;
    monkey.collide(ground2);

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }

    spawnFood();
    spawnObstacles();

    if (obstaclesGroup.isTouching(monkey)) {
      monkey.scale = 0.1
      obstaclesGroup.destroyEach();
    }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 5
      bananaSound.play();
    }

    var rand = Math.round(random(1, 4));
    switch (score) {

      case 10:
        monkey.scale = 0.3
        break;
      case 20:
        monkey.scale = 0.4
        break;
      case 30:
        monkey.scale = 0.5
        break;
      case 40:
        monkey.scale = 0.6
        break;
      default:
        break;

    }



    if (monkey.scale < 0.2) {
      gameState = END;
    }

  } else if (gameState === END) {
    monkey.velocityY = 0;
    ground.velocityX = 0;

    monkey.destroy();
    obstaclesGroup.destroyEach();
    FoodGroup.destroyEach();

    gameOver.visible = true;


  }
  drawSprites();
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(800, 450, 40, 10);
    banana.y = random(200, 600);
    banana.velocityX = -(5 + 4 * score / 10);

    banana.lifetime = 250;
    monkey.depth = banana.depth + 1;

    banana.addImage(bananaImage);
    banana.scale = 0.1;

    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 770, 10, 40);
    obstacle.velocityX = -(6 + 3 * score / 10);


    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.2;

    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}
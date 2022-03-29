//declarando as variáveis
var trex,trex_running,trex_collided;
var edges;
var ground,ground_image;
var ground2
var cloud,cloud_image
var cacto,cacto_img1,cacto_img2,cacto_img3,cacto_img4,cacto_img5,cacto_img6;
var score = 0
var recorde = 0
var play =1
var end =0
var gameState =play
var cactogp
var cloudgp
var game_over,game_overimg
var restart,restartimg
var jump,die,checkPoint
var isDead = false


//preload carrega as mídias do jogo
function preload(){
  //animação do trex
  trex_running = loadAnimation("images/trex3.png","images/trex4.png");
  trex_collided = loadAnimation("images/trex_collided.png")
  game_overimg = loadImage("images/gameOver.png")
  restartimg = loadImage("images/restart.png")
  //animação do solo
  ground_image = loadImage("images/ground2.png")

   cloud_image = loadImage ("images/cloud.png")
    
  cacto_img1 = loadImage ("images/obstacle1.png")
   
  cacto_img2 = loadImage ("images/obstacle2.png")

  cacto_img3 = loadImage ("images/obstacle3.png")

  cacto_img4 = loadImage ("images/obstacle4.png")

  cacto_img5 = loadImage ("images/obstacle5.png")

  cacto_img6 = loadImage ("images/obstacle6.png")

  jump = loadSound ("sounds/jump.mp3")

  die = loadSound ("sounds/die.mp3")

  checkPoint = loadSound ("sounds/checkPoint.mp3")
}


//setup faz a configuração
function setup(){
  createCanvas(windowWidth,windowHeight);

  //sprite trex
  trex = createSprite(50,height-40,20,40);
  trex.addAnimation("running",trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)
  trex.debug = false
  trex.setCollider("rectangle",0,0,35,80,30)
  //trex.setCollider("circle",0,0,35)

  //sprite Solo
  ground = createSprite(width/2,height-20,width,10)
  ground.addImage("solo",ground_image)
  //criando bordas
  edges = createEdgeSprites();
  //criando solo 2
  ground2 = createSprite(width/2,height-10,width,10)
  ground2.visible =  false

  cactogp = new Group()
  cloudgp = new Group()

  restart = createSprite(width/2,height-100)
  game_over = createSprite(width/2,height-50)
  restart.addImage(restartimg)
  game_over.addImage(game_overimg)
  game_over.scale = 0.5
  restart.scale = 0.7
  restart.visible = false
  game_over.visible = false
}

//draw faz o movimento, a ação do jogo
function draw(){
  background("white");

if (trex.isTouching(cactogp)){
  gameState = end

  if (!isDead){
    die.play()
    isDead = true
  }
}

  if (gameState==play){
    if ((keyDown("space")|| touches.lenght > 0)&& trex.y > height-45) {
      trex.velocityY = -10;
      jump.play()
      touches = []
    }
    ground.velocityX =- (5 + score / 100)
    if(ground.x < 250){
      ground.x = ground.width/2
      
    }
    score = score +  Math.round(getFrameRate()/60)
    if (score%100 == 0 && score > 0){
      checkPoint.play()

    }
    cloud_generator()
    cacto_generator()
  
  }

  if (gameState==end){
    ground.velocityX = 0 
    cactogp.setVelocityXEach(0)
    cloudgp.setVelocityXEach(0)
    trex.changeAnimation("collided")
    cloudgp.setLifetimeEach(-1)
    cactogp.setLifetimeEach(-1)
    restart.visible = true
    game_over.visible = true
    if (mousePressedOver(restart)){
      gameState=play
      restart.visible = false
      game_over.visible = false
      cactogp.destroyEach()
      cloudgp.destroyEach()
      trex.changeAnimation("running")
      score=0
    }
    if (score > recorde){
      recorde = score 

    }
  }

  //pulo do trex
  
  
  gravity();

  //colisão do trex
  trex.collide(ground2);
  

  //movimento do solo
   

  //coordenadas do mouse na tela
  

  text("Recorde: "+ recorde,width-70,height-160 )
  text("Score: "+score,width-70,height-180)
 
  text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  drawSprites();
}

//função da gravidade
function gravity(){
  trex.velocityY += 0.5;
}

function cloud_generator(){
  
  if (frameCount%60 == 0){
    cloud = createSprite(width,random(height-180,height-100),30,50)
    cloud.velocityX =- (2 + score / 100)
    cloud.addImage("nuvem",cloud_image)
    cloud.scale = random (0.5,1.5)
    cloud.depth = trex.depth - 1 
    cloud.lifetime = 330
    cloudgp.add(cloud)
  }
}

function cacto_generator(){
  if (frameCount%100 == 0){
    cacto = createSprite(width,height-30,10,10)
    cacto.velocityX =- (5 + score / 100)
    var select_cacto = Math.round(random(1,6))
    switch (select_cacto) {
      case 1:cacto.addImage(cacto_img1) 
      break;
      case 2:cacto.addImage(cacto_img2)
      break;
      case 3:cacto.addImage(cacto_img3)
      break;
      case 4:cacto.addImage(cacto_img4)  
      break;
      case 5:cacto.addImage(cacto_img5)
      break;
      case 6:cacto.addImage(cacto_img6)
      break;
      
    }
    cacto.scale = 0.4
    cacto.lifetime = width/cacto.velocityX
    cactogp.add(cacto)
  } 
}
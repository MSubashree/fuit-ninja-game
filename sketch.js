//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife;
var knifeImage ;
var r,rex, fruit, fruits,fruitImage;
var fruit1,fruit2,fruit3,fruit4;
var Enemy, monster, monsterImage,gameoverImage;

var fruitGroup;
var enemyGroup;

var score;
var gameover,restart;

var gameoverSound;
var knifeSwoosh;



function preload(){
  
  knifeImage = loadImage("knife.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  monsterImage=loadImage("alien1.png");
  gameoverImage=loadImage("gameover.png");
  
  gameoverSound=loadSound("gameover.mp3");
  knifeSwoosh=loadSound("knifeSwooshSound.mp3");
  
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);
 //knife.setcollider.debug(true);
  
  //display score 
  score=0;
  //create fruit and monster Group variable here
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
   fruits();
   Enemy();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
  //to move the sword with mouse
  
  if(fruitGroup.isTouching(knife)){
    knifeSwoosh.play();
    fruitGroup.destroyEach();
      score=score+2;
    
  }
   if(enemyGroup.isTouching(knife)){
     gameState=END;
    fruitGroup.destroyEach();
     enemyGroup.destroyEach();
    knife.addImage(gameoverImage);
    gameoverSound.play();
  }
    // Increase score if knife touching fruit
   
    // Go to end state if knife touching enemy
      
  }
  
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}


function fruits(){
if(World.frameCount %80 ==0){
  
  fruit=createSprite(400,200,20,20);

  fruit.debug=false;
  
  r=Math.round(random(1,4));
 // text("r : "+r, 300,50);
  if (r == 1){
    fruit.addImage(fruit1);
  } else if (r == 2){
    fruit.addImage(fruit2);
  } else if (r == 3){
    fruit.addImage(fruit3);
  }  else {
    fruit.addImage(fruit4);
  }
  fruit.scale=0.2;
  fruit.y=Math.round(random(50,340));
  fruit.velocityX=-(8+(score/5));
  fruit.setLifetime=100;
  fruitGroup.add(fruit);

    }
}

function Enemy (){
  if(World.frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    
    monster.setLifetime=50;
    enemyGroup.add(monster);
  }
}
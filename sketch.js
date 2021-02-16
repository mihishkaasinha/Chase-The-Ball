var gamestate="intro",border;
var score=0;
var level=1;
var touch;
function preload() {
bg1=loadImage("bg4.png")
introimage=loadImage("Title.png");
playimage=loadImage("play.png")
ballimage=loadImage("Ballimage.png")
bubbleimage=loadImage("power.png.png")
pauseimage=loadImage("pause.png");
pause2image=loadImage("play2.png")
enemyimage=loadImage("Dragon.png")
touch=loadSound("tuntun.mp3")
oversound=loadSound("gameover.mp3")
restartimage=loadImage("restart.png")
buttonsound=loadSound("button.mp3")
}

function setup(){
    var canvas = createCanvas(600,600);
    play=createSprite(300,400,20,20);
    play.addImage(playimage);
    play.scale=0.08;
    pause=createSprite(570,30);
    pause.addImage(pauseimage)
    pause.scale=0.14;
    intro=createSprite(300,50,20,20);
    bubble=createSprite(800,900);
    bubble.addImage(bubbleimage)
    restart=createSprite(300,450);
    restart.addImage(restartimage);
    restart.scale=0.3
    restart.visible=false
    bubble.scale=0.6;
    bubble.setCollider("circle",0,0,45);
    intro.addImage(introimage);
    intro.velocityY=5
    intro.scale=0.2
    ball=createSprite(random(20,580),random(20,580),20,200);
    ball.addImage(ballimage);
    ball.scale=0.05;
    ball.setCollider("circle",0,0,500)
    border=createSprite(-5,288,10,576)
    enemygroup=new Group();
}

function draw(){
    background(bg1);
        textSize(40);
            fill(255)
            stroke(0);
            strokeWeight(4);
            text(Math.round(score),5,35)
    if(gamestate==="intro"){
        pause.visible=false
    restart.visible=false
    intro.collide(play)
            if(touches.length>0||mousePressedOver(play)){
            gamestate="play"
            touches=[];
            buttonsound.play();
            intro.visible=false;
            play.visible=false;
            }
        }
        if(gamestate==="play"){  
            bubble.x=mouseX
            textSize(30);
            fill("blue")
            stroke(rgb(random(0,255),random(0,255),random(0,255)));
            strokeWeight(5);
            textAlign(CENTER)
            text("Press P to Pause",420,30);
            pause.visible=true;
    restart.visible=false
    bubble.y=mouseY
            bubble.depth=ball.depth
            spawnenemy();
            bubble.rotationSpeed=20;
            textAlign(CENTER)
            textSize(40);
            fill(255)
            stroke(0);
            strokeWeight(4);
            text("Level "+Math.round(level),300,580)
            bubble.depth++
            if(mouseIsOver(ball)){
                ball.x=random(20,580)
                ball.y=random(20,580)
                score=score+1
                level=level+0.05
                touch.play();
            }if(bubble.isTouching(enemygroup)){
            gamestate="end"
             oversound.play();
            }   if(keyDown("p")){
                buttonsound.play();
                gamestate="pause";
            }
            stroke("red")
            strokeWeight(5)
            line(mouseX,mouseY,ball.x,ball.y)   
          ball.rotationSpeed=10
}
if(gamestate==="end"){
enemygroup.destroyEach();
        pause.visible=false
        restart.visible=true;
    ball.rotationSpeed=0;
    if(mousePressedOver(restart)){
        gamestate="play";
        level=1
            buttonsound.play();
            score=0
    }
textSize(200);
fill(0)
stroke(0);
textAlign(CENTER)
strokeWeight(16);
text("GAME",300,180);
text("OVER",300,350);
}
if(gamestate==="pause"){
    enemygroup.setVelocityEach(0,0);
    enemygroup.setLifetimeEach(-1)
    pause.addImage(pause2image);
    textSize(30);
    ball.rotationSpeed=0
    bubble.rotationSpeed=0
    fill("blue")
    stroke(rgb(random(0,255),random(0,255),random(0,255)));
    strokeWeight(5);
    textAlign(CENTER)
    text("Press R to Play",420,30);
if(keyDown("r")){
    enemygroup.setVelocityEach(-score/90-3,0);
    enemygroup.setLifetimeEach(-(600/enemy.velocityX))
    buttonsound.play();
    pause.addImage(pauseimage);
gamestate="play"
}
}
drawSprites();
}
function spawnenemy(){
    if(frameCount%40===0){
        enemy=createSprite(610,random(20,580));
enemy.addImage(enemyimage);
enemy.scale=random(0.08,0.3);
enemy.velocityX=-score/90-3
enemy.lifetime=-(600/enemy.velocityX)
enemy.setCollider("rectangle",0,0,500,200)
enemygroup.add(enemy)
    }
}
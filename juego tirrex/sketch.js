var suelo, imagenPiso
var trex ,trex_running;
var sueloInvisible
var obstaculos
var nubes
var captus
var apellido="Guerrero";
var puntuacion=0;
var play=1;
var end=0;
var gameState=play;
var grupoCaptus;
var grupoNubes;
var reiniciar,reiniciarImg;
var gameOver,gameOverImg;
var dino;
var saltoS;
var muerteS;
var puntS;
var edges;
function preload(){
  
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");  // Animacio(loadAnimation)
imagenPiso=loadImage("ground2.png");          //Imagen (loadImage)
nubeImg=loadImage("cloud.png");
captus1=loadImage("obstacle1.png")
captus2=loadImage("obstacle2.png")
captus3=loadImage("obstacle3.png")
captus4=loadImage("obstacle4.png")
captus5=loadImage("obstacle5.png")
captus6=loadImage("obstacle6.png")
reiniciarImg=loadImage("restart.png")
gameOverImg=loadImage("gameOver.png")
dino=loadImage("trex_collided.png")
saltoS=loadSound("jump.mp3")   //(loadSound) dar sonido
muerteS=loadSound("die.mp3")
puntS=loadSound("checkpoint.mp3")
}

function setup(){
 edges=createEdgeSprites();
  createCanvas(600,200)
  suelo=createSprite (200,180,400,20);
  trex=createSprite (50,160,20,50);
  //crear sprite de Trex
 trex.addAnimation("corriendo",trex_running);
 trex.scale=0.5;       //escala
 trex.x=200;
 suelo.addImage("p",imagenPiso);
 sueloInvisible=createSprite(200,190,400,10)
sueloInvisible.visible=false;  
reiniciar=createSprite(300,140);   
reiniciar.scale=0.6;
gameOver=createSprite(300,100);
gameOver.scale=0.6;
reiniciar.addImage(reiniciarImg);
gameOver.addImage(gameOverImg);
trex.setCollider("rectangle",0,0,30,70,trex.height);   //altura del trex(height)
trex.debug=true;                    //mostrar el radio conlicionador 
grupoNubes=new Group();
grupoCaptus=new Group();    //Grupo
trex.addAnimation("dino",dino);
var mensaje="esto es un mensssssssssssssssssssssaje"
console.log(mensaje);
}



function draw(){

  background("lightblue")
  //trex.collide(edges[4]);
                                  //console.log("esto es", gameState);
  
  text("puntacion:"+puntuacion,500,50);
  puntuacion=puntuacion+Math.round(frameCount/60);  //math.round(numeros enteros)
 
  if (gameState===play){
   suelo.velocityX=-(6+3*puntuacion/100);   //la velocidad que se la pide dar 
   gameOver.visible=false;     //no se mostrara la imagen
   reiniciar.visible=false;
   
   if (suelo.x<0){
     suelo.x=suelo.width/2; //suelo infinito
      if (keyDown("j")&&trex.y>=100){
      trex.velocityY=-10;       //{salto del trex
      saltoS.play();
      }
      trex.velocityY=trex.velocityY+0.8;        //esta instucion es para la "gravedad" 
    }
    
    nubes();
    obstaculos();
   if(puntuacion>0&&puntuacion%100===0){ //cada 100 va a hecr un sonido 
     puntS.play();
   }
   
    if (grupoCaptus.isTouching(trex)){
     // trex.velocityY=-12
     // trex.velocityY=trex.velocityY+2;
      gameState=end;
      muerteS.play();
    }

  }
  else if(gameState===end){
   background("red");
   suelo.velocityX=0;
   grupoCaptus.setVelocityXEach(0);   //velocidad en end
   grupoNubes.setVelocityXEach(0);
   gameOver.visible=true;
   reiniciar.visible=true;
    trex.changeAnimation("dino",dino); 
    grupoCaptus.setLifetimeEach(-1);  //para que el timpo de vida nunca se acabe
    grupoNubes.setLifetimeEach(-1);
    trex.velocityY=0;
  }
//console.count("este es el numero de cuadros");   // numero de cuadros
//console.time(trex.y);   //tiempo
// trex.collide(suelo);
if (mousePressedOver(reiniciar)){
//console.log("aqui se va a reiniciar el juego");         
reset();
}


 trex.collide(sueloInvisible)
  drawSprites();
                              //console.log(nubeImg.depth)
                              //console.timeEnd();
                             //console.info("esta es una aaaaaaaaaaaaaaaaaaaaaaaaaadvertenciaaaaaaaaaaaaaaaaa");   

console.log("Christopher"+" "+"Adiel"+apellido)
}



function obstaculos(){
    if (frameCount%60===0){
      captus=createSprite(600,160,20,50);   
      captus.velocityX=-(6+puntuacion/100);  
      captus.scale=0.6;
       var rand=Math.round(random(1,6));    //math.round(numeros enteros)
     switch(rand){           //sentencia
 case 1: captus.addImage(captus1);
       break;
       case 2: captus.addImage(captus2);
       break;
       case 3: captus.addImage(captus3);  //timpo de vida
       break;
       case 4: captus.addImage(captus4);
       break;
       case 5: captus.addImage(captus5);
       break;
       case 6: captus.addImage(captus6);
       break;
       default: break;
}
captus.lifetime=200;         //tiempo de duracion de vida
grupoCaptus.add(captus);        //Grupo
}
}


function nubes(){
  if (frameCount%60===0){  //dividir los cudritos de manera exacta (el resultado tiene que ser 0)
   nube=createSprite(600,35,40,10);
   nube.velocityX=-3;
   nube.addImage(nubeImg);
   nube.scale=0.6; //tamaño
   nube.y=Math.round(random(10,60));  //ramdom    //math.round(numeros enteros)
   nube.depth=trex.depth;
   trex.depth=trex.depth +1;
   nube.lifetime=200;  //tiempo de vida
   grupoNubes.add(nube);
  }
 
}

function reset(){
gameState=play;
gameOver.visible=false;
gameOver.visible=false;
grupoCaptus.destroyEach();
grupoNubes.destroyEach();
trex.changeAnimation("corriendo",trex_running);
puntuacion=0;

}







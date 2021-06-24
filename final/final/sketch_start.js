let BgImg;
let btnImg;
let myCanvas;


function centerCanvas()  {
  let x = windowWidth/2 - width/2;   
  let y = windowHeight/2 - height/2; 
  myCanvas.position(x,y); 
}

function preload(){
  BgImg=loadImage('Lobby.png');
 
}

function setup() {
  
 
  myCanvas = createCanvas(1280, 640); //創建一個畫布指定給myCanvas
  centerCanvas();
  image(BgImg,0,0);
  btnImg=createImg('Start_B.png');
  btnImg.size(200,50);
  btnImg.position(windowWidth/2-100,windowHeight/2+100);
  btnImg.mousePressed(goNext);
  
}

function draw() {
 
}

function goNext(){
   window.open('index_second.html','_self');

}


function windowResized() {
  centerCanvas();
  btnImg.position(windowWidth/2-100,windowHeight/2+100);
}
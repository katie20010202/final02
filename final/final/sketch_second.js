let BgImg;
let btnImg;
let myCanvas;


function centerCanvas()  {
  let x = windowWidth/2 - width/2;   
  let y = windowHeight/2 - height/2; 
  myCanvas.position(x,y);
}


function preload(){
  BgImg=loadImage('Method.png');
 
}

function setup() {
  
  
  myCanvas = createCanvas(1280,640); 
  centerCanvas();
  image(BgImg,0,0);
  btnImg=createImg('Start_B.png');
  btnImg.size(200,50);
  btnImg.position(540,420);
  btnImg.mousePressed(goNext);
  
  
  
}

function draw() {
 
}
function goNext(){
   window.open('index_win.html','_self');

}

function windowResized() {
  centerCanvas();
}


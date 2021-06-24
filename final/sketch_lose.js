let chong;
let BgImg;
let btnImg;
let myCanvas;
let sound1;

function centerCanvas()  {
  let x = windowWidth/2 - width/2;   
  let y = windowHeight/2 - height/2;
  myCanvas.position(x,y); 
}


function preload(){
  BgImg=loadImage('lose.png');
  chong=loadImage('chongLose.png');
  sound1 = loadSound('lose_music.mp3');
}

function setup() {
  myCanvas = createCanvas(1280,640); 
  centerCanvas();
  image(BgImg,0,0);
  image(chong,780,340,230,220);
  btnImg=createImg('losereplay.png');
  btnImg.size(170,80);
  btnImg.position(windowWidth/2+450,windowHeight/2+230);
  btnImg.mousePressed(goNext);
  sound1.play();
}

function draw() {
 
  
}

function goNext(){
   window.open('index.html','_self');

}


function windowResized() {
  centerCanvas();
  btnImg.position(windowWidth/2+450,windowHeight/2+230);
}

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
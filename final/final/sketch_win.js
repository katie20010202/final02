let chong;
let BgImg;
let btnImg;
let myCanvas;
let sound;

function centerCanvas()  {
  let x = windowWidth/2 - width/2;   
  let y = windowHeight/2 - height/2; 
  myCanvas.position(x,y);
}

function preload(){
  sound = loadSound('win_music.mp3');
  BgImg=loadImage('win.png');
  chong=loadImage('chongWin.png');
}

function setup() {
  
  sound.play();
  myCanvas = createCanvas(1280,640); 
  centerCanvas(); 
  image(BgImg,0,0);
  image(chong,780,380,250,220);
  
  btnImg=createImg('winreplay.png');
  btnImg.size(170,80);
  btnImg.position(windowWidth/2+450,windowHeight/2+230);
  btnImg.mousePressed(goNext);
  
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

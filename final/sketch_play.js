let alcohol,alcohol_spray;
let classifier;
let url = 'https://teachablemachine.withgoogle.com/models/SeN4bZD29/'; 
let label = '';
let video;
let poseNet;
let poses = [];
let bg;
let whiteY=640;
let leftHand,rightHand;
let mode=0;
let myCanvas;
let virus=[];
let virusX,virusY;
let count=34;
let gif;
let virus_num=33;
let pic;
let picY;
let sound;


function centerCanvas()  {
  let x = windowWidth/2 - width/2;  
  let y = windowHeight/2 - height/2; 
  myCanvas.position(x,y); 
}

function preload(){
  sound = loadSound('start_music.mp3');
  bg=loadImage('Game_lung.png');  
  pic=loadImage('ShiChong.png');  
  alcohol=loadImage('alcohol.png');  
  alcohol_spray=loadImage('alcohol_spray.png');  
  classifier = ml5.soundClassifier(url+'model.json');
  gif=loadImage('virus.png');  
}

function setup() { 
  sound.play();
  picY=796;
  white=rect(0,640,1280,640);
  myCanvas = createCanvas(1280, 640); 
  centerCanvas();
  video = createCapture(VIDEO);
  video.size(1280, 640);
  poseNet = ml5.poseNet(video,'single',modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
  leftHand = createVector(0,0);
  rightHand = createVector(0,0);
  classifyAudio();
 }

function classifyAudio(){
  classifier.classify(gotResults);
}

function modelReady() {
  print('Model Loaded');
}

function mousePressed(){
  print(mouseX,mouseY);
}


function draw() {
  imageMode(CENTER);
  background(255,160,122);
  fill(250,235,215);
  rect(0,whiteY-10,1280,640);
  noStroke();
  if (frameCount % 10 == 0 ) {
    if(whiteY>0){
      
    whiteY= whiteY-2;
    
    if( whiteY<=height*(3/5)){
      if(picY>494){
       picY=picY-70;
      }
       if(picY<=494){
         picY=494;
       }
     }
 }
  }  
   if(whiteY<=0){
      whiteY=0;
      sound.stop();
      tint(150,65,160);
      goLose();
 }
  

  image(bg,width/2,height/2, 1280 ,640 );
  drawKeypoints();
  
  image(pic,width*(13/15)-50,picY,342,312);
  
  for(let i=0; i<virus.length; i++){
    
    virus[i]. display();
    virus[i]. move();
    
  }
  
  
  count--;
  if(count>0){
     let virusX=random(0+300,width-300);
     let virusY=random(0+100,height-100);
     let virusSize=random(50,80);
     //virusSize=map(virusSize, 0, 120, 20, );
     let v = new Virus(virusX, virusY, virusSize);
     virus.push(v); // -> 新增陣列長度 
    }
    
  
    if(virus_num>0){
    for(let i=0;i<virus.length;i++){
       if(virus[i].contains(leftHand.x, rightHand.y) == true && mode==1){
        virus.splice(i,1);
        whiteY= whiteY+6;
        virus_num--;
        }
     } 
     
    }    
    else{
      goWin();
   }
    
    if(label=='sss'){
      
      image(alcohol_spray, leftHand.x, rightHand.y );    
      mode=1;
    }
    else{
      mode=0;
      image(alcohol, leftHand.x, rightHand.y );
    }
  
}



function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        if(j==9){
            leftHand.x = keypoint.position.x;
            leftHand.y = keypoint.position.y;
        }else if(j==10){
            rightHand.x = keypoint.position.x;
            rightHand.y = keypoint.position.y;
        }
      }
    }
  }
}


function windowResized() {
  centerCanvas();//執行畫布置中function
   //virusX=constrain(virusX,windowWidth/2 - width/2+300,windowWidth/2 + width/2-300);
   //virusY=constrain(virusY,windowHeight/2 - height/2+100,windowHeight/2 + height/2-130);
}
function goWin(){
 window.open('index_win.html','_self'); 
}
function goLose(){
 window.open('index_lose.html','_self'); 
}

function gotResults(error,results){
  if(error){
    console.error(error);
    return
  }
  label = results[0].label;
}
  
  
class Virus {
  constructor(_x, _y, _width) {
    this.x = _x;
    this.y = _y;
    this.width = _width;
  }
  move(){
    this.x = this.x + random(-3,3);
    this.y = this.y + random(-3,3);
    this.width=this.width+random(-2,2);
    this.width=constrain(this.width, 20, 100);
    this.x = constrain(this.x,0+300,width-300);
    this.y =constrain(this.y,0+100,height-100);
  }
   display() {
    
    imageMode(CENTER);      
    image(gif, this.x, this.y, this.width, this.width);
    // gif.position(this.x,this.y);
    // gif.size(this.width, this.width);
    
  } 
    contains(px,py){
      let dx=px-this.x;
      let dy=py-this.y;
     if(dx>180 && dx<240 && dy>20 && dy<50){
       return true;
     }else{
       return false;
     }
  }
}
  
  

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
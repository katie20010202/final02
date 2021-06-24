let alcohol,alcohol_spray;
let classifier;
let url = 'https://teachablemachine.withgoogle.com/models/flGVdONmh/'; 
let label = '';
let video;
let poseNet;
let poses = [];
let bg;
let leftHand,rightHand;
let mode=0;
let myCanvas;
let sound;
let lc1,lc2,rc1,rc2;
let cir_l=0;
let cir_r=0;
let cir_ly;
 
let al=204;
let bl=0;
let cl=128;

let ar=204;
let br=0;
let cr=128;

function centerCanvas()  {
  let x = windowWidth/2 - width/2;  
  let y = windowHeight/2 - height/2; 
  myCanvas.position(x,y); 
}

function preload(){
  alcohol=loadImage('alcohol.png');  
  alcohol_spray=loadImage('alcohol_spray.png');  
  bg=loadImage('Method.png');
  classifier = ml5.soundClassifier(url+'model.json');
  sound = loadSound('start_music.mp3');
}


function setup() {
  
  sound.play();
  myCanvas = createCanvas(1280, 640); 
  centerCanvas();
  video = createCapture(VIDEO);
  video.size(1280, 640);

  poseNet = ml5.poseNet(video,'single',modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();

  lc1 = createVector(0,0);
  lc2 = createVector(0,0);
  rc1 = createVector(0,0);
  rc2 = createVector(0,0);
  leftHand = createVector(0,0);
  rightHand = createVector(0,0);
  
  classifyAudio();
  
}

function mousePressed(){
  print(mouseX,mouseY);
}

function classifyAudio(){
  classifier.classify(gotResults);
}

function modelReady() {
  print('Model Loaded');
}

function draw() {
  imageMode(CENTER);
  image(video, width/2, height/2, 1280 ,960 );
  
  image(bg, width/2, height/2, 1280 ,640 );
  drawKeypoints();
  
 
  if(label=='sss'){
    mode=1;
  }
  else{mode=0;}
  
  
  let dl=dist(width/2+200,height*(3/5),leftHand.x,leftHand.y)
  let dr=dist(width/2-160,height*(3/5),rightHand.x,rightHand.y)
  
  if(dl<=50 && dl>=0 ){
    
    cir_r=1;
  }
 
   if(dr<=50 && dr>=0 ){
    
     cir_l=1;
   }
  
  if(cir_l==0){
    
  cir_ly=height*(3/5);
  }
  
  if(cir_l==1){
    
     cir_ly=rightHand.y;
     al=0;
     bl=255;
     cl=255;
  }
  
  if(cir_r==0){
    
    cir_rx=width/2+200;
   
  }
  if(cir_r==1){
    
    cir_rx=leftHand.x
    ar=0;
    br=255;
    cr=255;
    
  }
  noFill();
  stroke(ar,br,cr);
  strokeWeight(5);
  circle(width/2+200,height*(3/5),100);
  
  noFill();
  stroke(al,bl,cl);
  strokeWeight(5);
  circle(width/2-160,height*(3/5),100);
  
  noStroke();
  fill(al,bl,cl);   
  circle(width/2-160,cir_ly,70);
  
  noStroke();
  fill(ar,br,cr);   
  circle( cir_rx,height*(3/5),70);
  
  
  if(cir_l==1 && cir_r==1 && mode==0){
    
    
      image(alcohol, leftHand.x, rightHand.y );
    
    
  }
  
  
   
  if(cir_l==1 && cir_r==1 && mode==1){
    
    
      image(alcohol_spray, leftHand.x, rightHand.y );
      goNext();
    
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


  

function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
  
function windowResized() {
  centerCanvas();//執行畫布置中function
}

function goNext(){
 window.open('index_play.html','_self'); 
}

function gotResults(error,results){
  if(error){
    console.error(error);
    return
  }
  label = results[0].label;
  //print(results);
}
  
  
img = "";
status = "";
objects = [];
video = "";

function preload()
{
    img = loadImage('RR.webp');
    alert1=loadSong()
}

function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status = DETECTING OBJECTS";
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error,result){
    if(error){
        console.log(error);

        play("mixkit-battleship-alarm-1001.wav") 
    }

    console.log(result);
    objects=result;
}

function draw(){
    image(video,0,0,380,380);

    if(status!= ""){
        r = random(240);
        g = random(248);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status-OBJECT DETECTED";
            document.getElementById("number_of_objects").innerHTML="number of objects are : " + objects.length;

            fill('#00CED1');
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " +  percent + " %",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke('#00CED1');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
       
      }
    
}



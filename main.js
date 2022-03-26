Status="";
input_text="";
objects=[];

function setup(){
    canvas=createCanvas(380,290)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    video.size(380,290)
}

function start(){
    object_detector=ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects"
    input_text=document.getElementById("input_name").ariaValueMax;
}

function modelLoaded(){
    console.log("model_loaded")
    Status=true;
}

function draw(){
    image(video,0,0,480,380)
    if(Status !=""){
        object_detector.detect(video,gotresult)
        for(i=0;i>object.lenght;i++){
            document.getElementById("status").innerHTML="Status = Object Detected";
            console.log(object.lenght);
            fill("#a8ed40");
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15)
            nofill()
            stroke("#ed9c40")
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i.height]);
    
            if(objects[i].label==input_name){
                video.stop();
                object_detector.detect(gotresult)
                document.getElementById("object_found").innerHTML=input_name+"Found";
                var synth = window.speechSynthesis;
                var utterThis=new SpeechSynthesisUtterance(input_name+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_found").innerHTML=input_name+"Not found"
            }
        }
       

    }
}

function gotresult(error,result){
if(error){
    console.error(error)
}
else{
    console.log(result)
    objects=result;
}
}
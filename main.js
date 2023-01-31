song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0; 
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
 image(video, 0, 0, 600, 500,);  

 fill("#FF0000");
 stroke("#FF0000");

if(scoreRightWrist > 0.2)
{
 circle(rightWristX,rightWristY,20);
 if(rightWristY > 0 && rightWristY <= 100)
 {
    document.getElementById("speed").innerHTML = "Velocidad = 0.5";
    song.rate(0.5);
 }
 if(rightWristY > 100 && rightWristY <= 200)
 {
    document.getElementById("speed").innerHTML = "Velocidad = 1.0 ";
    song.rate(1);
 }
 if(rightWristY > 200 && rightWristY <= 300)
 {
    document.getElementById("speed").innerHTML = "Velocidad = 1.5";
    song.rate(1.5);
 }
 if(rightWristY > 300 && rightWristY <= 400)
 {
    document.getElementById("speed").innerHTML = "Velocidad = 2.0";
    song.rate(2);
 }
 if(rightWristY > 400 && rightWristY <= 500)
 {
    document.getElementById("speed").innerHTML = "Velocidad = 2.5";
    song.rate(2.5);
 }
}

 if (scoreLeftWrist > 0.2)
 {
    circle(leftWiristX,leftWristY,20);
 InNumberleftWristY = Number(leftWristY);
 remove_decimals = floor(InNumberleftWristY);
 volume = remove_decimals/500;
 document.getElementById("volume").innerHTML = "Volumen = " + volume;
 song.setVolume(volume);
}

}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() 
{
    console.log('PoseNet esta inicialisado');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWiristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
     console.log("rightWiristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}
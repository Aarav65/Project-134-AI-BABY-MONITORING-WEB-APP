songs = "";
status = "";
object = []

function  preload()
{
    songs = loadSound('alarm.mp3');
}
function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Object"
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
}

function gotResult(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    object = results;
}


function draw()
{
    
    image(video, 0, 0, 380, 380);
    

    if(status != "")
    {
        objectDetector.detect(video, gotResult);

        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_object").innerHTML = "Number of Objects detected are " + object.length;

            fill(r, g, b);

            percent = floor(object[i].confidence * 100);

            text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15);

            noFill();

            stroke(r, g, b);

            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == "person")
            {
                document.getElementById("baby").innerHTML = "Baby found";
                console.log("stop");
                songs.stop();
            }
            else
            {
                document.getElementById("baby").innerHTML = "Baby not found";
                console.log("play");
                songs.play();  
            }

            if(object.length == 0)
            {
                document.getElementById("baby").innerHTML = "Baby not found";
                console.log("play");
                songs.play();
            }
        }
    }
}
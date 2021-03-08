//If You See This You Are A Wonderful Person And I Hope You Like My Code ^^

//Get The HTML Elements
var topImage = document.getElementById("topImage");
topImage.style.backgroundImage = "url(\"imgs/1.jpg\")";
var bottImage = document.getElementById("bottImage");
bottImage.style.backgroundImage = "url(\"imgs/1.jpg\")";

//Size Of The Document
var x = document.documentElement.scrollWidth;
var y = document.documentElement.scrollHeight;

//Image Variables
var currentBackground = 1;
var totalImg = 199;
var sunriseImg = 40;

//Time Variables
var sunrise = "0501";
sunrise = parseInt(sunrise.substr(0, 2))*60 + parseInt(sunrise.substr(2, 4));
var totalTime = 1440;
var currentHour;
var minutes = totalTime / totalImg;
var debug = 0;
var offset = Math.floor(sunrise/minutes) - sunriseImg + 1;



//Start Function
function start() {
    var newX;
    var newY;

    if (x/y>16/9) {
        newY = (x*9)/16;
        topImage.style.backgroundSize = x + "px " + newY + "px";
        topImage.style.backgroundPosition="center";
        bottImage.style.backgroundSize = x + "px " + newY + "px";
        bottImage.style.backgroundPosition="center";
    }

    else {
        newX = (y*16)/9;
        topImage.style.backgroundSize = newX + "px " + y + "px";
        topImage.style.backgroundPosition="center";
        bottImage.style.backgroundSize = newX + "px " + y + "px";
        bottImage.style.backgroundPosition="center";
    }

    checkHour();

    return;
}



//Change Background Function
function changeBack(num) {
    if (num > totalImg + 1) {
        num = num - totalImg + 1;
    }
    else if (num < 1) {
        num = totalImg + 1 + num;
    }

    topImage.style.backgroundImage = "url(\"imgs/"+num+".jpg\")";
    setTimeout(function(){
        bottImage.style.backgroundImage = "url(\"imgs/"+num+".jpg\")";
    }, interval/2);

    // console.log("Changed Image To " + num);

    return;
}



//Update Check
function checkHour() {
    var date = new Date();
    currentHour = date.getHours()*60 + date.getMinutes() + debug;
    // console.log(currentHour);
    
    if (currentHour/minutes > currentBackground + 1 || currentHour/minutes < currentBackground) {
        currentBackground = Math.floor(currentHour/minutes);
        // console.log(currentBackground);
        changeBack(currentBackground - offset + 1);
    }

    return;
}



//Interval Of Update Check
var interval = 2000;
var a = setInterval(checkHour, interval);
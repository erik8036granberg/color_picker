"use strickt";


let newImage = new Image();
let imageCanvas = document.querySelector("#imageCanvas");
let ctx = imageCanvas.getContext("2d");
let imageData;
let x;
let y;

window.addEventListener("DOMContentLoaded", init);


function init() {
    console.log("init");
    crateAndLoadImage();
}

function crateAndLoadImage() {
    console.log("crateAndLoadImage");

    // create image i DOM
    newImage.src = 'cat.jpg';

    // when image is loaded
    newImage.addEventListener("load", drawImage);
    myImageData();
}

function myImageData() {
    imageData = ctx.getImageData(x, y, 500, 600);
    console.log(imageData);
}

function drawImage() {
    // draw image in canvas
    ctx.drawImage(newImage, 0, 0);
}

// get position eventlistner
imageCanvas.addEventListener("mousemove", getPosition, false);

// get position
function getPosition(event) {
    x = event.x;
    y = event.y;

    x -= imageCanvas.offsetLeft;
    y -= imageCanvas.offsetTop;

    console.log("x:" + x + " y:" + y);
    drawRectangle();
}

function drawRectangle() {
    x = x - 5;
    y = y - 5;
    ctx.strokeRect(x, y, 10, 10);
}



// 🎁 Here you go! 🎁
function showColorInfo(rgb) {

    document.querySelector("#r").textContent = rgb.r;
    document.querySelector("#g").textContent = rgb.g;
    document.querySelector("#b").textContent = rgb.b;

    const hex = "#" + rgb.r.toString(16).padStart(2, "0") +
        rgb.g.toString(16).padStart(2, "0") +
        rgb.b.toString(16).padStart(2, "0");

    document.querySelector("#hex").textContent = hex;

    document.querySelector("#colorbox").style.backgroundColor = hex;
}
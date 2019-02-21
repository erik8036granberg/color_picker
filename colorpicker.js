"use strickt";

let newImage = new Image();
let imageCanvas = document.querySelector("#imageCanvas");
let ctx = imageCanvas.getContext("2d");
let zoomCxt = zoomCanvas.getContext("2d");
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
}

function drawImage() {
    // draw image in canvas
    ctx.drawImage(newImage, 0, 0);
    myImageData();
}

function myImageData() {

    // get pixel data from image
    imageData = ctx.getImageData(0, 0, 500, 600);
    console.log(imageData);
}

// get mouse position on every move on the canvas
imageCanvas.addEventListener("mousemove", getPosition, false);


function getPosition(event) {

    // get mouse position
    x = event.x;
    y = event.y;

    x -= imageCanvas.offsetLeft;
    y -= imageCanvas.offsetTop;

    console.log("x:" + x + " y:" + y);
    drawRectangle();

    // put image data in ctx
    ctx.putImageData(imageData, 0, 0);

    drawRectangle();
}

function drawRectangle() {

    // draw rectangle with 5 px offset for centering
    ctx.strokeRect(x - 5, y - 5, 10, 10);
    ctx.moveTo = (x, y);
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
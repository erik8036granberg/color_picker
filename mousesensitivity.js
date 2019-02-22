"use strict";

const newImage = new Image();
const imageCanvas = document.querySelector("#imageCanvas");
const ctx = imageCanvas.getContext("2d");
const imageWidth = ctx.canvas.width;
const imageHeight = ctx.canvas.height;
let imageData;

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    crateAndLoadImage();
}

function crateAndLoadImage() {
    console.log("crateAndLoadImage");

    // image path
    newImage.src = "cat.jpg";

    // when image is loaded
    newImage.addEventListener("load", drawImage);
}

function getImageData() {
    console.log("getImageData");
    // get pixel data from image
    imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    console.log(imageData);
}

function drawImage() {
    console.log("drawImage");
    // draw image in canvas
    ctx.drawImage(newImage, 0, 0);
    getImageData();
}

// get mouse position move on canvas
imageCanvas.addEventListener("mousemove", getPosition, false);

function getPosition(event) {
    console.log("getPosition");

    // clear canvas - clearRect + canvas size
    ctx.clearRect(0, 0, imageWidth, imageHeight);

    // get mouse position
    let x = event.x;
    let y = event.y;
    x -= imageCanvas.offsetLeft;
    y -= imageCanvas.offsetTop;

    console.log("x:" + x + " y:" + y);

    // put image data in ctx
    ctx.putImageData(imageData, 0, 0);

    drawRectangle(x, y);
}

function drawRectangle(x, y) {
    console.log("drawRectangle");
    // draw rectangle with 5 px offset for centering
    ctx.strokeRect(x - 5, y - 5, 10, 10);
    ctx.strokeStyle = "green";
    ctx.moveTo = (x, y);
}
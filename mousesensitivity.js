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
    // get pixel data from image
    imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    console.log(imageData);
}

function drawImage() {
    // draw image in canvas
    ctx.drawImage(newImage, 0, 0);
    getImageData();
}
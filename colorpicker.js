"use strict";

const newImage = new Image();
const imageCanvas = document.querySelector("#imageCanvas");
const ctx = imageCanvas.getContext("2d");
const zoomCtx = zoomCanvas.getContext("2d");
const imageWidth = ctx.canvas.width;
const imageHeight = ctx.canvas.height;
let imageData;
const zoomWidth = zoomCtx.canvas.width;
let zoomData;

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

function drawImage() {
    // draw image in canvas
    ctx.drawImage(newImage, 0, 0);
    getImageData();
}

function getImageData() {
    // get pixel data from image
    imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
    console.log(imageData);
    createZoomData();
}

function createZoomData() {
    // create an empty imageData for the zoom canvas
    console.log("createZoomData");
    zoomData = zoomCtx.createImageData(10, 10);
    console.log(zoomData);
}

function copyPixel(startX, startY) {
    console.log("copyPixel");

    // loop for x and y content i zoomCtx (10x10px grid)
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            // calculate pixelIndex position (loop x & y)
            const pixelIndex = (x + y * 10) * 4;

            // use mouse position (startX & startY) with (loop x & y)
            const imageX = startX + x + -5;
            const imageY = startY + y + -5;

            // calculate where in the imageData to copy from
            imageIndex = (imageX + imageY * imageWidth) * 4;

            // copy each pixel (4 colors) data from imageData to zoomData
            zoomData.data[pixelIndex + 0] = imageData.data[imageIndex + 0];
            zoomData.data[pixelIndex + 1] = imageData.data[imageIndex + 1];
            zoomData.data[pixelIndex + 2] = imageData.data[imageIndex + 2];
            zoomData.data[pixelIndex + 3] = imageData.data[imageIndex + 3];

            // fill with red test
            //  zoomData.data[pixelIndex + 0] = 255; //r
            //  zoomData.data[pixelIndex + 1] = 0; //g
            //  zoomData.data[pixelIndex + 2] = 0; //b
            //  zoomData.data[pixelIndex + 3] = 255; //a
        }
        drawZoomData();
    }
}

function drawZoomData() {
    // put zoomData in zoom canvas (zoomCtx)
    zoomCtx.putImageData(zoomData, 0, 0);
}

// get mouse position on every move on the canvas
imageCanvas.addEventListener("mousemove", getPosition, false);

function getPosition(event) {
    // get mouse position
    let x = event.x;
    let y = event.y;
    x -= imageCanvas.offsetLeft;
    y -= imageCanvas.offsetTop;

    console.log("x:" + x + " y:" + y);

    // put image data in ctx
    ctx.putImageData(imageData, 0, 0);

    drawRectangle(x, y);
    copyPixel(x, y);
    getColor(x, y);
}

function drawRectangle(x, y) {
    // draw rectangle with 5 px offset for centering
    ctx.strokeRect(x - 5, y - 5, 10, 10);
    ctx.strokeStyle = "green";
    ctx.moveTo = (x, y);
}

function getColor(x, y) {
    // color info from a pixel - return {r,g,b}
    const pixelIndex = 4 * (x + y * imageWidth);
    const r = imageData.data[pixelIndex];
    const g = imageData.data[pixelIndex + 1];
    const b = imageData.data[pixelIndex + 2];
    console.log(`r: ${r} g: ${g} b: ${b}`)

    const rgb = {
        r,
        g,
        b
    }

    showColorInfo(rgb);
}

// 🎁 Here you go! 🎁 - thanks!!
function showColorInfo(rgb) {
    document.querySelector("#r").textContent = rgb.r;
    document.querySelector("#g").textContent = rgb.g;
    document.querySelector("#b").textContent = rgb.b;

    const hex =
        "#" +
        rgb.r.toString(16).padStart(2, "0") +
        rgb.g.toString(16).padStart(2, "0") +
        rgb.b.toString(16).padStart(2, "0");

    document.querySelector("#hex").textContent = hex;
    document.querySelector("#colorbox").style.backgroundColor = hex;
}
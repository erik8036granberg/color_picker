"use strickt";

let newImage = new Image();
let imageCanvas = document.querySelector("#imageCanvas");
let ctx = imageCanvas.getContext("2d");
let imageData;
let zoomCtx = zoomCanvas.getContext("2d");
let zoomData;
let imageWidth = ctx.canvas.width;
let imageHeight = ctx.canvas.height;

window.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    crateAndLoadImage();
}

function crateAndLoadImage() {
    console.log("crateAndLoadImage");

    // create image i DOM
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


    // loop for x and y in coordinates i zoomCtx (10x10px)
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {

            // xxx
            let zoomIndex = (x + y * 10) * 4;

            // get mouse positon x & Y - and use for-loop (x & y) to set "grid"
            let imageX = startX + x;
            let imageY = startY + y;

            // calculate imageIndex 
            imageIndex = (imageX + imageY * imageWidth) * 4;

            // copy each pixel data from imageData to zoomData
            zoomData.data[zoomIndex + 0] = imageData.data[imageIndex + 0];
            zoomData.data[zoomIndex + 1] = imageData.data[imageIndex + 1];
            zoomData.data[zoomIndex + 2] = imageData.data[imageIndex + 2];
            zoomData.data[zoomIndex + 3] = imageData.data[imageIndex + 3];

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
    // draw the zoomData to the zoom canvas (zoomCtx)
    zoomCtx.putImageData(zoomData, 0, 0);
}

// function copyPixel() {
//     let w = zoomIndex.canvas.width;
//     let imageW = ctx.canvas.width;

//     for (let y = 0; y < 10; y++) {
//         for (let y = 0; y < 10; y++) {
//             let pixelIndex = (x + y * w) * 4;

//             let imageX = startX + x;
//             let imageY = startY + y;

//             let imageIndex = (imageX + imageY * imageW) * 4;

//             zoomData.data[pixelIndex + 0] = 255; //r
//             zoomData.data[pixelIndex + 1] = 0; //g
//             zoomData.data[pixelIndex + 2] = 0; //b
//             zoomData.data[pixelIndex + 3] = 255; //a
//         }
//     }
// }





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
}

function drawRectangle(x, y) {
    // draw rectangle with 5 px offset for centering
    ctx.strokeRect(x - 5, y - 5, 10, 10);
    ctx.moveTo = (x, y);
    getColor(x, y);
}

function getColor(x, y) {
    // color info from a pixel - return {r,g,b}
    let pixelIndex = 4 * (x + y * imageWidth);
    let r = imageData.data[pixelIndex];
    let g = imageData.data[pixelIndex + 1];
    let b = imageData.data[pixelIndex + 2];
    console.log(`r: ${r} g: ${g} b: ${b}`)

    let rgb = {
        r,
        g,
        b
    }

    showColorInfo(rgb);
}

// 🎁 Here you go! 🎁
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
"use strict";

const newImage = new Image();
const imageCanvas = document.querySelector("#imageCanvas");
const ctx = imageCanvas.getContext("2d");
let imageData;
const imageWidth = ctx.canvas.width;
const imageHeight = ctx.canvas.height;

const mapImage = new Image();
const mapCanvas = document.querySelector("#mapCanvas");
const mapCtx = mapCanvas.getContext("2d");
let mapData;

const outputCtx = outputCanvas.getContext("2d");
let outputData;

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  loadImages();
}

function loadImages() {
  console.log("loadImages");

  // image path for original image
  newImage.src = "cat.jpg";

  // image path for map image
  mapImage.src = "map.jpg";

  // check if the image sizes are the same
  if (
    newImage.naturalWidth !== mapImage.naturalWidth ||
    newImage.naturalHeight !== mapImage.naturalHeight
  ) {
    alert("WTF! - The images have different sizes??");
  }
  newImage.addEventListener("load", function() {
    mapImage.addEventListener("load", drawImages);
  });
}

function drawImages() {
  console.log("drawImages");

  // draw original image in canvas
  ctx.drawImage(newImage, 0, 0);

  // draw map image in canvas
  mapCtx.drawImage(mapImage, 0, 0);

  // save pixel data from image
  imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  mapData = mapCtx.getImageData(0, 0, imageWidth, imageHeight);

  // create an empty imageData for the output canvas
  outputData = outputCtx.createImageData(500, 600);
}

// get mouse position on every move on the canvas
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

  // put image data in ctx
  ctx.putImageData(imageData, 0, 0);
  copyPixel(x, y);
  calculateRatios(x, y);
}

function calculateRatios(x, y) {
  // -1 to 1 ratio (x / imageWidth * range - center )
  const mouseXratio = (x / imageWidth) * 2 - 1;
  const mouseYratio = (y / imageHeight) * 2 - 1;

  document.querySelector("#pos_x_ratio").textContent = mouseXratio;
  document.querySelector("#pos_y_ratio").textContent = mouseYratio;

  drawRectangle(x, y, mouseXratio, mouseYratio);
}

function drawRectangle(x, y, mouseXratio, mouseYratio) {
  console.log("drawRectangle");

  // displacementX/Y
  const MAX_MOVEMENT = 20; // max movement i px
  const displacementX = MAX_MOVEMENT * mouseXratio;
  const displacementY = MAX_MOVEMENT * mouseYratio;

  //   Rectangle size
  const rectWidth = imageWidth - MAX_MOVEMENT;
  const rectHeight = imageHeight - MAX_MOVEMENT;

  console.log(MAX_MOVEMENT);
  console.log(`disX: ${displacementX}`);
  console.log(`disY: ${displacementY}`);

  //   draw Rectangle with displacementX/Y "offset" + half of MAX_MOVEMENT
  ctx.strokeRect(
    displacementX + MAX_MOVEMENT / 2,
    displacementY + MAX_MOVEMENT / 2,
    rectWidth,
    rectHeight
  );

  ctx.strokeStyle = "green";
  ctx.moveTo = (x, y);
}

function copyPixel(startX, startY) {
  console.log("copyPixel");

  // loop for x and y content i output Canvas
  for (let y = 0; y < imageHeight; y++) {
    for (let x = 0; x < imageWidth; x++) {
      // calculate pixelIndex position (loop x & y)
      const pixelIndex = (x + y * imageWidth) * 4;

      // copy each pixel (4 colors) data from imageData to zoomData
      outputData.data[pixelIndex + 0] = imageData.data[pixelIndex + 0];
      outputData.data[pixelIndex + 1] = imageData.data[pixelIndex + 1];
      outputData.data[pixelIndex + 2] = imageData.data[pixelIndex + 2];
      outputData.data[pixelIndex + 3] = imageData.data[pixelIndex + 3];
    }
    drawOutputData();
  }
}

function drawOutputData() {
  // put outputData in canvas
  outputCtx.putImageData(outputData, 0, 0);
}

function loop() {}

function uddate() {}

function output() {}

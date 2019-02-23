"use strict";

const newImage = new Image();
const imageCanvas = document.querySelector("#imageCanvas");
const ctx = imageCanvas.getContext("2d");
const imageWidth = ctx.canvas.width;
const imageHeight = ctx.canvas.height;
let imageData;

let mouseXratio;
let mouseYratio;

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

  calculateRatios(x, y);
}

function calculateRatios(x, y) {
  // 0 to 1 ratio
  // let posX = (x / imageWidth);
  // let posY = (y / imageHeight);

  // -1 to 1 ratio (x / imageWidth * range - center )
  mouseXratio = (x / imageWidth) * 2 - 1;
  mouseYratio = (y / imageHeight) * 2 - 1;

  document.querySelector("#pos_x_ratio").textContent = mouseXratio;
  document.querySelector("#pos_y_ratio").textContent = mouseYratio;

  drawRectangle(x, y);
}

function drawRectangle(x, y) {
  console.log("drawRectangle");

  const MAX_MOVEMENT = 20; // max movement i px
  let displacementX = MAX_MOVEMENT * mouseXratio;
  let displacementY = MAX_MOVEMENT * mouseYratio;

  let rectWidth = imageWidth - MAX_MOVEMENT;
  let rectHeight = imageHeight - MAX_MOVEMENT;

  console.log(MAX_MOVEMENT);
  console.log(`disX: ${displacementX}`);
  console.log(`disY: ${displacementY}`);

  //   draw Rectangle with displacement + half of MAX_MOVEMENT
  ctx.strokeRect(
    displacementX + MAX_MOVEMENT / 2,
    displacementY + MAX_MOVEMENT / 2,
    rectWidth,
    rectHeight
  );

  ctx.strokeStyle = "green";
  ctx.moveTo = (x, y);

  if (mouseXratio >= 0 && mouseYratio >= 0) {
  }
}

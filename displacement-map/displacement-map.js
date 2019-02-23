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
const mapWidth = mapCtx.canvas.width;
const mapHeight = mapCtx.canvas.height;

const outputCtx = outputCanvas.getContext("2d");
const outputmWidth = outputCtx.canvas.width;
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

  // todo - find preload-stuff that works
  newImage.addEventListener("load", drawImages);
}

function drawImages() {
  console.log("drawImages");

  // draw original image in canvas
  ctx.drawImage(newImage, 0, 0);

  // draw map image in canvas
  mapCtx.drawImage(mapImage, 0, 0);

  getImageData();
}

function getImageData() {
  console.log("getImageData");

  // get pixel data from image
  imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  mapData = mapCtx.getImageData(0, 0, mapWidth, mapHeight);
  console.log(imageData);
  console.log(mapData);
}

function createOutputData() {
  console.log(outputData);
  // create an empty imageData for the zoom canvas
  console.log("createOutputData");
  outputData = outputCtx.createImageData(500, 600);
}

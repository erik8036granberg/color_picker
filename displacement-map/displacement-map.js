"use strict";

const newImage = new Image();
const imageCanvas = document.querySelector("#imageCanvas");
const ctx = imageCanvas.getContext("2d");
let imageData;
const imageWidth = ctx.canvas.width;
const imageHeight = ctx.canvas.height;
const mapImage = new Image();
const mapCanvas = document.querySelector("#mapCanvas");
const ctxMap = mapCanvas.getContext("2d");
let mapData;
const mapWidth = ctxMap.canvas.width;
const mapHeight = ctxMap.canvas.height;

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

  // check if images is loaded
  if (!newImage.complete && !mapImage.complete) {
    console.log("images loaded");
    newImage.addEventListener("load", drawImages);
  }
}

function drawImages() {
  console.log("drawImages");
  // draw original image in canvas
  ctx.drawImage(newImage, 0, 0);
  // draw map image in canvas
  ctxMap.drawImage(mapImage, 0, 0);
  getImageData();
}

function getImageData() {
  console.log("getImageData");
  // get pixel data from image
  imageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
  mapData = ctxMap.getImageData(0, 0, mapWidth, mapHeight);
  console.log(imageData);
  console.log(mapData);
}

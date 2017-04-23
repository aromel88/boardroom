const animations = require('./animations');

let updateCallback;

// DOM elements
let topCanvas;    // drawing canvas
let topCtx;
let mainCanvas;   // display canvas
let mainCtx;

// drawing control variables
let drawing;
let drawAllowed = true;

const setUpdateCallback = (callback) => {
  updateCallback = callback;
};

// initialization of canvas elements
const init = () => {
  // grab canvas and ctx
  topCanvas = document.querySelector('#top-canvas');
  topCanvas.addEventListener('mousedown', mouseDown);
  topCanvas.addEventListener('mousemove', mouseMove);
  topCanvas.addEventListener('mouseup', stopDraw);
  topCanvas.addEventListener('mouseleave', stopDraw);
  topCtx = topCanvas.getContext('2d');
  topCtx.strokeStyle = 'black';
  mainCanvas = document.querySelector('#main-canvas');
  mainCtx = mainCanvas.getContext('2d');
};

// set stroke color of canvas
const setStroke = (style) => {
  topCtx.strokeStyle = style;
};

// helper method returns mouse position in local coordinate system of element
const getMouse = (e) => {
  const mouse = {};
  mouse.x = e.pageX - e.target.offsetLeft;
  mouse.y = e.pageY - e.target.offsetTop;
  return mouse;
};

// mouse down event handler, start drawing
const mouseDown = (e) => {
  console.log('down');
  if (drawAllowed) {
    drawing = true;
    const mouse = getMouse(e);
    const drawData = {
      x: mouse.x,
      y: mouse.y,
      //style: topCtx.strokeStyle,
    };
//    client.emit('beginDrawStream', drawData);
    startDraw(drawData);
  }
};

// mousemove event handler for drawing
const mouseMove = (e) => {
  if (drawing) {
    const mouse = getMouse(e);
    draw(mouse);
//    client.emit('updateDrawStream', {
//      x: mouse.x,
//      y: mouse.y,
//    });
  }
};

// set drawAllowed flag
const allowDraw = (allow) => {
  drawAllowed = allow;
  lineWidth = 1;
};

// called to ensure draw flag is false
const stopDraw = () => {
  drawing = false;
};

// start a drawing path where the mouse is clicked on the canvas
const startDraw = (drawData) => {
  // topCtx.strokeStyle = drawData.style;
  topCtx.lineWidth = drawData.lineWidth;
  topCtx.beginPath();
  topCtx.moveTo(drawData.x, drawData.y);
};

// draw a line to new point when mouse is dragged on the canvas
const draw = (drawData) => {
  topCtx.lineTo(drawData.x, drawData.y);
  topCtx.stroke();
  mainCtx.drawImage(topCanvas, 0, 0);
  topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
};

// clear canvas of any drawing
const clearCanvas = () => {
  mainCtx.fillStyle = 'white';
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
};

module.exports.init = init;
module.exports.setUpdateCallback = setUpdateCallback;
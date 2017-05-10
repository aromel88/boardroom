const app = require('./app');
const client = require('./client');
const animations = require('./animations');

let updateCallback;

// DOM elements
let topCanvas;    // drawing canvas
let topCtx;
let mainCanvas;   // display canvas
let mainCtx;
let canvasTools;
let canvasSlideButton;

// drawing control variables
let activeTab;
let drawing;
let drawAllowed = true;
let canvasOpen = false;
let currentTool = 0;  // 0 is pen, 1 is eraser
let strokeStyle = 'black';
let lineWidth = 1;

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
  topCanvas.style.cursor = 'url("assets/img/pen-cursor.png") -20 20,crosshair';
  topCtx = topCanvas.getContext('2d');
  topCtx.strokeStyle = 'black';
  mainCanvas = document.querySelector('#main-canvas');
  mainCtx = mainCanvas.getContext('2d');
  canvasTools = document.querySelector('#canvas-tools');
  canvasSlideButton = document.querySelector('#canvas-slide-button');

  client.on('receiveCanvasData', receiveCanvasData);
  clearCanvas();
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
  if (drawAllowed) {
    drawing = true;
    const mouse = getMouse(e);
    const drawData = {
      x: mouse.x,
      y: mouse.y,
      strokeStyle: strokeStyle,
      lineWidth: lineWidth,
      id: activeTab,
    };
    client.emit('beginDrawStream', drawData);
    startDraw(drawData);
  }
};

// mousemove event handler for drawing
const mouseMove = (e) => {
  e.preventDefault();
  if (drawing) {
    const mouse = getMouse(e);
    const drawData = {
      x: mouse.x,
      y: mouse.y,
      strokeStyle: strokeStyle,
      lineWidth: lineWidth,
      id: activeTab
    };
    client.emit('updateDrawStream', drawData);
    draw(drawData);
  }
};

// called to ensure draw flag is false
const stopDraw = () => {
  drawing = false;
  client.emit('stopDraw');
  sendCanvasData();
};

const beginDrawStream = (data) => {
  drawAllowed = false;
  startDraw(data);
};

// start a drawing path where the mouse is clicked on the canvas
const startDraw = (drawData) => {
  if (drawData.id !== activeTab) return;
  topCtx.lineWidth = drawData.lineWidth;
  topCtx.strokeStyle = drawData.strokeStyle;
  topCtx.beginPath();
  topCtx.moveTo(drawData.x, drawData.y);
};

// draw a line to new point when mouse is dragged on the canvas
const draw = (drawData) => {
  if (drawData.id !== activeTab) return;
  topCtx.save();
  topCtx.strokeStyle = drawData.strokeStyle;
  topCtx.lineWidth = drawData.lineWidth;
  topCtx.lineTo(drawData.x, drawData.y);
  topCtx.stroke();
  mainCtx.drawImage(topCanvas, 0, 0);
  topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
  topCtx.restore();
};

const endDrawStream = () => {
  drawAllowed = true;
};

const receiveCanvasData = (canvasData) => {
  if (canvasData.imgData) {
    let image = new Image();
    clearCanvas();
    image.onload = () => {
      mainCtx.globalCompositeOperation = 'source-over';
      mainCtx.drawImage(image, 0, 0, mainCanvas.width, mainCanvas.height);
    }
    image.src = canvasData.imgData;
  }
};

const sendCanvasData = () => {
  client.emit('sendCanvasData', {
    id: activeTab,
    imgData: mainCanvas.toDataURL(),
  });
};

// clear canvas of any drawing
const clearCanvas = () => {
  mainCtx.fillStyle = 'white';
  mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
};

const canvasWasCleared = (data) => {
  if (activeTab === data.id) {
    clearCanvas();
  }
};

const toggleCanvas = () => {
  canvasOpen = !canvasOpen;
  if (canvasOpen) {
    TweenMax.to('.canvas-slide', 0.3, { right: '+=400px' });
    TweenMax.to('.canvas-grow', 0.3, { width: '-=400px' });
  } else {
    TweenMax.to('.canvas-slide', 0.3, { right: '-=400px', onComplete: () => {
        clearCanvas();
    }});
    TweenMax.to('.canvas-grow', 0.3, { width: '+=400px' });
  }
};

const toggleTool = () => {
  currentTool = currentTool == 0 ? 1 : 0;
  if (currentTool === 0) {
    topCanvas.style.cursor = 'url("assets/img/pen-cursor.png") -20 20,crosshair';
    strokeStyle = 'black';
    lineWidth = 1;
  } else {
    topCanvas.style.cursor = 'url("assets/img/eraser-cursor.png") 10 20, default';
    strokeStyle = 'white';
    lineWidth = 20;
  }
};

const setActiveTab = (tabID) => {
  activeTab = tabID;
};

const getActiveTab = () => { return activeTab; };

const getCanvasOpen = () => { return canvasOpen; };

const getCurrentTool = () => { return currentTool; };

module.exports.init = init;
module.exports.startDraw = startDraw;
module.exports.beginDrawStream = beginDrawStream;
module.exports.draw = draw;
module.exports.endDrawStream = endDrawStream;
module.exports.clearCanvas = clearCanvas;
module.exports.canvasWasCleared = canvasWasCleared;
module.exports.setUpdateCallback = setUpdateCallback;
module.exports.toggleCanvas = toggleCanvas;
module.exports.toggleTool = toggleTool;
module.exports.setActiveTab = setActiveTab;
module.exports.getActiveTab = getActiveTab;
module.exports.getCurrentTool = getCurrentTool;
module.exports.canvasOpen = getCanvasOpen;
module.exports.sendCanvasData = sendCanvasData;
module.exports.receiveCanvasData = receiveCanvasData;

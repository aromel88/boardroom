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
  console.log('down');
  if (drawAllowed) {
    drawing = true;
    const mouse = getMouse(e);
    const drawData = {
      x: mouse.x,
      y: mouse.y,
      //style: topCtx.strokeStyle,
      id: activeTab
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
      id: activeTab
    };
    client.emit('updateDrawStream', drawData);
    draw(drawData);
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
  sendCanvasData();
};

// start a drawing path where the mouse is clicked on the canvas
const startDraw = (drawData) => {
  // topCtx.strokeStyle = drawData.style;
  if (drawData.id !== activeTab) return;
  topCtx.lineWidth = drawData.lineWidth;
  topCtx.beginPath();
  topCtx.moveTo(drawData.x, drawData.y);
};

// draw a line to new point when mouse is dragged on the canvas
const draw = (drawData) => {
  if (drawData.id !== activeTab) return;
  topCtx.lineTo(drawData.x, drawData.y);
  topCtx.stroke();
  mainCtx.drawImage(topCanvas, 0, 0);
  topCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
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

const setActiveTab = (tabID) => {
  activeTab = tabID;
};

const getActiveTab = () => { return activeTab; };

const getCanvasOpen = () => { return canvasOpen; };

const getCurrentTool = () => { return currentTool; };

module.exports.init = init;
module.exports.startDraw = startDraw;
module.exports.draw = draw;
module.exports.clearCanvas = clearCanvas;
module.exports.canvasWasCleared = canvasWasCleared;
module.exports.setUpdateCallback = setUpdateCallback;
module.exports.toggleCanvas = toggleCanvas;
module.exports.setActiveTab = setActiveTab;
module.exports.getActiveTab = getActiveTab;
module.exports.getCurrentTool = getCurrentTool;
module.exports.canvasOpen = getCanvasOpen;
module.exports.sendCanvasData = sendCanvasData;
module.exports.receiveCanvasData = receiveCanvasData;

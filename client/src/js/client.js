const canvas = require('./canvas');
import HomeContainer from './components/home/HomeContainer';

let socket;

const connect = () => {
  socket = io.connect();

  socket.on('startDraw', canvas.startDraw);
  socket.on('draw', canvas.draw);
  socket.on('clearCanvas', canvas.clearCanvas);
  socket.on('canvasWasCleared', canvas.canvasWasCleared);
};

const disconnect = () => {
  socket.disconnect();
  socket = undefined;
};

const on = (msg, callback) => {
  socket.on(msg, callback);
};

const emit = (msg, data) => {
  socket.emit(msg, data);
}

module.exports.connect = connect;
module.exports.disconnect = disconnect;
module.exports.on = on;
module.exports.emit = emit;

/*
  server.js
  main socketio script. initializes socket connection and hooks up
  socket event handlers

  author: Aaron Romel
*/

const socketio = require('socket.io');
const connectionManager = require('./connect');

let io;

const teams = {};

// Should join & create be separated?
const onJoin = (sock) => {
  const socket = sock;
  socket.on('join', (data) => {
    connectionManager.attemptConnect(data, socket);
  });
};

// const onMsg = (sock) => {
//   const socket = sock;
// };
//

const onCanvas = (sock) => {
  const socket = sock;
  socket.on('beginDrawStream', (data) => {
    socket.broadcast.to(socket.team).emit('startDraw', data);
  });

  socket.on('updateDrawStream', (data) => {
    socket.broadcast.to(socket.team).emit('draw', data);
  });
};
// const onDisconnect = (sock) => {
//   const socket = sock;
// };

const init = (expressApp) => {
  io = socketio(expressApp);
  io.sockets.on('connection', (sock) => {
    sock.emit('connected');
    onJoin(sock);
    // onMsg(sock);
    // onDisconnect(sock);
    onCanvas(sock);
  });
  console.log('Websocket server running');
};

const getIO = () => io;

module.exports.init = init;
module.exports.teams = teams;
module.exports.io = getIO;

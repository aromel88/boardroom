/*
  server.js
  main socketio script. initializes socket connection and hooks up
  socket event handlers

  author: Aaron Romel
*/

const socketio = require('socket.io');

let io;

// const onJoin = (sock) => {
//   const socket = sock;
// };
//
// const onMsg = (sock) => {
//   const socket = sock;
// };
//
// const onDisconnect = (sock) => {
//   const socket = sock;
// };

const init = (expressApp) => {
  io = socketio(expressApp);
  io.sockets.on('connection', (sock) => {
    sock.emit('connected');
    // onJoin(sock);
    // onMsg(sock);
    // onDisconnect(sock);
  });
  console.log('Websocket server running');
};

const getIO = () => io;

module.exports.init = init;
module.exports.io = getIO;

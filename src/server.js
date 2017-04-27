/*
  server.js
  main socketio script. initializes socket connection and hooks up
  socket event handlers

  author: Aaron Romel
*/

const socketio = require('socket.io');
const Team = require('./Team.js');

let io;

const teams = {};

// Should join & create be separated?
const onJoin = (sock) => {
  const socket = sock;

  socket.on('join', (data) => {
    let action = 'joined';
    let success = true;

    if (data.team && data.team !== '') {
      console.log(`Team: ${data.team} | Code: ${data.join} | Name: ${data.user}`);

      if (!teams[data.team]) {
        teams[data.team] = new Team(data.team);
        action = 'created';
      }

      const team = teams[data.team];

      // TODO: validate data.user before using
      if (!team.hasUser(data.user)) {
        team.addUser(data.user);
      } else {
        success = false;
      }

      if (success) {
        socket.join('room1'); // Could replace with data.team
      }
    } else {
      success = false;
    }

    socket.emit(action, { success });
  });
};

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
    onJoin(sock);
    // onMsg(sock);
    // onDisconnect(sock);
  });
  console.log('Websocket server running');
};

const getIO = () => io;

module.exports.init = init;
module.exports.io = getIO;

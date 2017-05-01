/*
  server.js
  main socketio script. initializes socket connection and hooks up
  socket event handlers

  author: Aaron Romel
*/

const socketio = require('socket.io');
const connectionManager = require('./connect');
const canvasManager = require('./canvas');
const Message = require('./Classes/Message.js');

let io;

const teams = {};

// Should join & create be separated?
const onJoin = (sock) => {
  const socket = sock;
  socket.on('join', (data) => {
    connectionManager.attemptConnect(data, socket);
  });
};

const onMsg = (sock) => {
  const socket = sock;

  socket.on('createMessage', (data) => {
    const user = socket.name;
    const id = Date.now() + user;
    const type = data.type;
    const content = data.content;
    const timestamp = data.timestamp;
    // const avatar = data.avatar;  // Will add in avatars later

    if (id && type && content && timestamp) {
      const newMessage = new Message(type, content, timestamp, user);
      teams[socket.team].addMessage(id, newMessage);
      socket.broadcast.to(socket.team).emit('message', { messageData: newMessage });
    } else {
      socket.emit('messageError', { msg: 'Message missing data!' });
    }
  });

  socket.on('getUsers', () => {
    const users = teams[socket.team].getUsers();
    socket.emit('userList', { users });
  });

  socket.on('getMessages', () => {
    const messages = teams[socket.team].getMessageArray();
    socket.emit('messageList', { messages });
  });
};


const onCanvas = (sock) => {
  const socket = sock;
  socket.on('beginDrawStream', (data) => {
    socket.broadcast.to(socket.team).emit('startDraw', data);
  });

  socket.on('updateDrawStream', (data) => {
    socket.broadcast.to(socket.team).emit('draw', data);
  });

  socket.on('createTab', (data) => {
    canvasManager.createTab(data, socket);
  });

  socket.on('sendCanvasData', (data) => {
    canvasManager.tabUpdated(data, socket);
  });

  socket.on('openTab', (data) => {
    canvasManager.sendTabData(data, socket);
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
    onMsg(sock);
    // onDisconnect(sock);
    onCanvas(sock);
  });
  console.log('Websocket server running');
};

const getIO = () => io;

module.exports.init = init;
module.exports.teams = teams;
module.exports.io = getIO;

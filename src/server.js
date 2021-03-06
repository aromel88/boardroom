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
const typers = [];

const createMessage = (data, sock) => {
  const socket = sock;
  const user = socket.name;
  const id = data.id;
  const type = data.type;
  const content = data.content;
  const timestamp = data.timestamp;
  // const avatar = data.avatar;  // Will add in avatars later

  if (id && type && content && timestamp) {
    const newMessage = new Message(id, type, content, timestamp, user);
    teams[socket.team].addMessage(id, newMessage);
    if (type === 'diagram') {
      io.sockets.in(socket.team).emit('message', { messageData: newMessage });
    } else {
      socket.broadcast.to(socket.team).emit('message', { messageData: newMessage });
    }
  } else {
    socket.emit('messageError', { msg: 'Message missing data!' });
  }
};

// Should join & create be separated?
const onJoin = (sock) => {
  const socket = sock;
  socket.on('join', (data) => {
    connectionManager.attemptConnect(data, socket);
  });
};

const onTyping = (sock) => {
  const socket = sock;

  socket.on('userTyping', (data) => {
    const user = data.user;
    const typing = data.typing;

    let typersChanged = false;

    if (typers.includes(user)) {
      if (typing === false) {
        typers.splice(typers.indexOf(user), 1);
        typersChanged = true;
      }
    } else {
      typers.push(user);
      typersChanged = true;
    }

    // Only update clients if actual changes occurred
    if (typersChanged && typers.length >= 0) {
      socket.broadcast.to(socket.team).emit('typingUsers', { users: typers });
    }
  });
};

const onMsg = (sock) => {
  const socket = sock;

  socket.on('createMessage', (data) => {
    createMessage(data, socket);
  });

  socket.on('getUsers', () => {
    const users = teams[socket.team].getUsers();
    socket.emit('userList', { users });
  });

  socket.on('getMessages', () => {
    const messages = teams[socket.team].getMessageArray();
    socket.emit('messageList', { messages });
  });

  socket.on('reopenDiagram', (data) => {
    const team = teams[socket.team];
    const messages = team.getMessages();
    const tabId = data.id;
    canvasManager.createTab({
      id: tabId,
      user: data.user,
      curTab: data.curTab,
    }, socket);
    socket.emit('tabReopened', { id: tabId });
    delete messages[tabId];
    const messageArray = team.getMessageArray();
    io.sockets.in(socket.team).emit('messageList', { messages: messageArray });
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

  socket.on('stopDraw', (data) => {
    socket.broadcast.to(socket.team).emit('stopDraw', data);
  });

  socket.on('createTab', (data) => {
    canvasManager.createTab(data, socket);
  });

  socket.on('sendCanvasData', (data) => {
    canvasManager.tabUpdated(data, socket);
  });

  socket.on('clearCanvas', (data) => {
    canvasManager.clearCanvas(data, socket);
  });

  socket.on('openTab', (data) => {
    canvasManager.sendTabData(data, socket);
  });

  socket.on('doneEditing', (data) => {
    canvasManager.doneEditing(data, socket);
  });
};

const onDisconnect = (sock) => {
  const socket = sock;

  socket.on('disconnect', () => {
    connectionManager.handleDisconnect(socket);
  });
};

const init = (expressApp) => {
  io = socketio(expressApp);
  io.sockets.on('connection', (sock) => {
    sock.emit('connected');
    onJoin(sock);
    onTyping(sock);
    onMsg(sock);
    onDisconnect(sock);
    onCanvas(sock);
  });
  console.log('Websocket server running');
};

const getIO = () => io;

module.exports.init = init;
module.exports.teams = teams;
module.exports.io = getIO;
module.exports.createMessage = createMessage;

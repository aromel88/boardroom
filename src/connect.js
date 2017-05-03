const server = require('./server');
const Team = require('./Classes/Team');

const attemptCreate = (data, sock) => {
  const socket = sock;
  const team = data.team;
  const code = data.code;
  const user = data.user;
  // make sure team doesn't already exist
  if (server.teams[data.team]) {
    socket.emit('joinFailure', { err: 'Team already exists' });
    return;
  }
  // that's the only check we need for making a room
  socket.team = team;
  socket.name = user;
  socket.join(team);

  server.teams[team] = new Team(team, code);
  server.teams[team].addUser(user, socket);
  socket.emit('joinSuccess', { team, code, user });

  socket.broadcast.to(team).emit('userJoined', { user });
};

const attemptJoin = (data, sock) => {
  const socket = sock;
  const team = data.team;
  const code = data.code;
  const user = data.user;
  const teamData = server.teams[team];
  // make sure this room exists
  if (!teamData) {
    socket.emit('joinFailure', { err: 'Team does not exist' });
    return;
  }
  // make sure the team doesn't already have this user
  if (teamData.hasUser(user)) {
    socket.emit('joinFailure', { err: 'Team already has user with that name' });
    return;
  }
  // make sure join code matches
  if (!teamData.validCode(code)) {
    socket.emit('joinFailure', { err: 'Join code does not match' });
    return;
  }
  // yay! we goooooood
  // that's the only check we need for making a room
  socket.team = team;
  socket.name = user;
  socket.join(team);

  const existingTabs = teamData.getTabs();
  teamData.addUser(user, socket);
  socket.emit('joinSuccess', { team, code, user, existingTabs });
  socket.broadcast.to(team).emit('userJoined', { user });
};

const attemptConnect = (connectData, sock) => {
  if (connectData.type === 'create') {
    attemptCreate(connectData, sock);
  } else {
    attemptJoin(connectData, sock);
  }
};

const handleDisconnect = (sock) => {
  const socket = sock;
  // if the socket has no name the connection is disconnecting from a join fail
  if (!socket.name) {
    return;
  }

  // kill the room if no users are left
  const team = server.teams[socket.team];
  const tabsNeedUpdate = team.removeUser(socket.name);
  server.io().sockets.in(socket.team).emit('tabsUpdated', team.getTabs());

  const userList = team.getUsers();
  if (userList.length < 1) {
    delete server.teams[socket.team];
  } else {
    server.io().sockets.in(socket.team).emit('userList', {users: userList});
    socket.leave(socket.team);
  }
};

module.exports.attemptCreate = attemptCreate;
module.exports.attemptJoin = attemptJoin;
module.exports.attemptConnect = attemptConnect;
module.exports.handleDisconnect = handleDisconnect;

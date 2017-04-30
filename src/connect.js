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

  console.dir(server.teams);
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

  teamData.addUser(user, socket);
  socket.emit('joinSuccess', { team, code, user });

  // Give new user existing data
  const users = server.teams[team].getUsers();
  const messages = server.teams[team].getMessageArray();
  console.dir(users);
  console.dir(messages);
  socket.emit('userList', { users });
  socket.emit('messageList', { messages });

  // Inform other users of new member
  socket.broadcast.to(team).emit('userJoined', { user });

  console.dir(server.teams);
};

const attemptConnect = (connectData, sock) => {
  if (connectData.type === 'create') {
    attemptCreate(connectData, sock);
  } else {
    attemptJoin(connectData, sock);
  }
};

module.exports.attemptCreate = attemptCreate;
module.exports.attemptJoin = attemptJoin;
module.exports.attemptConnect = attemptConnect;

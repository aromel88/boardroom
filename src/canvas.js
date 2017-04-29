const server = require('./server');
const Tab = require('./Classes/Tab');

const createTab = (data, sock) => {
  const socket = sock;
  const newTab = new Tab(data.id, data.user);
  const team = server.teams[socket.team];
  team.addTab(newTab);
  server.io().sockets.emit('tabCreated', team.getTabs());
}

module.exports.createTab = createTab;

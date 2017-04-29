const server = require('./server');
const Tab = require('./Classes/Tab');

const createTab = (data, sock) => {
  const socket = sock;
  const newTab = new Tab(data.id, data.user);
  const team = server.teams[socket.team];
  team.addTab(newTab);
  server.io().sockets.emit('tabsUpdated', team.getTabs());
};

const tabUpdated = (data, sock) => {
  const socket = sock;
  const team = server.teams[socket.team];

  team.updateDiagram(data.id, data.imgData);
};

const sendTabData = (data, sock) => {
  const socket = sock;
  const team = server.teams[socket.team];
  const tabs = team.tabs;
  const imgData = team.diagrams[data.openID];

  tabs.forEach((tab) => {
    // if the user has a tab open, remove them from that tab
    if (data.curID === tab.id) {
      tab.usersViewing.splice(data.user, 1);
    // put user in the new tab's user list
    } else if (data.openID === tab.id) {
      tab.usersViewing.push(data.user);
    }
  });

  socket.emit('tabOpened', {id: data.openID, imgData});
};

module.exports.createTab = createTab;
module.exports.tabUpdated = tabUpdated;
module.exports.sendTabData = sendTabData;

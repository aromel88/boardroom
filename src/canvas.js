const server = require('./server');
const Tab = require('./Classes/Tab');

const createTab = (data, sock) => {
  const socket = sock;
  const newTab = new Tab(data.id, data.user);
  const team = server.teams[socket.team];
  team.addTab(newTab);

  // if the user is in a tab, remove them from it
  if (data.curTab !== '') {
    team.getTabs().forEach((tab) => {
      if (tab.id === data.curTab) {
        tab.removeUserViewing(data.user);
      }
    });
  }
  server.io().sockets.in(socket.team).emit('tabsUpdated', team.getTabs());
};

const tabUpdated = (data, sock) => {
  const socket = sock;
  const team = server.teams[socket.team];
  if (team) {
    team.updateDiagram(data.id, data.imgData);
  }
};

const sendTabData = (data, sock) => {
  const socket = sock;
  const team = server.teams[socket.team];
  const tabs = team.getTabs();
  const imgData = team.diagrams[data.openID];

  tabs.forEach((tab) => {
    // if the user has a tab open, remove them from that tab
    if (data.curID === tab.id) {
      tab.usersViewing.splice(tab.usersViewing.indexOf(data.user), 1);
    // put user in the new tab's user list
    } else if (data.openID === tab.id) {
      tab.usersViewing.push(data.user);
    }
  });
  server.io().sockets.in(socket.team).emit('tabsUpdated', tabs);
  socket.emit('tabOpened', { id: data.openID, imgData });
};

const doneEditing = (data, sock) => {
  const socket = sock;
  const team = server.teams[socket.team];
  const tabs = team.getTabs();
  let r = -1;
  tabs.forEach((tab, i) => {
    if (data.id === tab.id) {
      tab.usersViewing.splice(tab.usersViewing.indexOf(data.user), 1);
      // if there no more users in the tab crate a message corresponding to this tab
      if (tab.usersViewing.length === 0) {
        const messageData = {
          type: 'diagram',
          timestamp: new Date().getTime(),
          content: 'A diagram was created',
        };
        server.createMessage(messageData, socket);
        r = i;
      }
    }
  });
  if (r > -1) tabs.splice(r, 1);

  server.io().sockets.in(socket.room).emit('tabsUpdated', tabs);
};

module.exports.createTab = createTab;
module.exports.tabUpdated = tabUpdated;
module.exports.sendTabData = sendTabData;
module.exports.doneEditing = doneEditing;

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
    if (data.imgData !== 0) {
      team.updateDiagram(data.id, data.imgData);
    } else {
      team.deleteDiagram(data.id);
    }
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
      tab.removeUserViewing(data.user);
    // put user in the new tab's user list
    } else if (data.openID === tab.id) {
      if (!tab.userIsViewing(data.user)) {
        tab.addUserViewing(data.user);
      }
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
    if (tab.userIsViewing(data.user)) {
      tab.removeUserViewing(data.user);
      if (tab.usersViewing.length === 0) {
        const diagramId = tab.id;
        const messageData = {
          type: 'diagram',
          timestamp: new Date().getTime(),
          content: 'A diagram was created',
          id: diagramId,
        };
        server.createMessage(messageData, socket);
        r = i;
      }
    }
  });
  if (r > -1) tabs.splice(r, 1);

  server.io().sockets.in(socket.team).emit('tabsUpdated', tabs);
};

const clearCanvas = (data, sock) => {
  const socket = sock;
  socket.broadcast.to(socket.team).emit('canvasWasCleared', data);
  tabUpdated({ id: data.id, imgData: 0 }, socket);
};

module.exports.createTab = createTab;
module.exports.tabUpdated = tabUpdated;
module.exports.sendTabData = sendTabData;
module.exports.doneEditing = doneEditing;
module.exports.clearCanvas = clearCanvas;

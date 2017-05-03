class Team {
  constructor(teamname, code) {
    this.name = teamname;
    this.code = code;
    this.users = [];
    this.messages = {};
    this.diagrams = {};
    this.tabs = [];
    this.sockets = {};
  }

  hasUser(user) {
    return this.users.includes(user);
  }

  validCode(code) {
    return this.code === code;
  }

  addUser(user, socket) {
    this.users.push(user);
    this.sockets[user] = socket;
  }

  removeUser(user) {
    this.users.splice(this.users.indexOf(user), 1);
    let tabsNeedUpdate = false;
    this.tabs.forEach((tab) => {
      if (tab.userIsViewing(user)) {
        tab.removeUserViewing(user);
        tabsNeedUpdate = true;
      }
    });
    delete this.sockets[user];

    return tabsNeedUpdate
  }

  addMessage(id, message) {
    if (this.messages[id]) {
      // update message
    } else {
      this.messages[id] = message;
    }
  }

  updateDiagram(id, imgData) {
    this.diagrams[id] = imgData;
  }

  addTab(tab) {
    this.tabs.push(tab);
  }

  getUsers() {
    return this.users;
  }

  getSockets() {
    return this.sockets;
  }

  getMessages() {
    return this.messages;
  }

  getTabs() {
    return this.tabs;
  }

  getMessageArray() {
    const messages = this.messages;
    const messageArray = Object.keys(this.messages).map(id => messages[id]);
    return messageArray;
  }
}

module.exports = Team;

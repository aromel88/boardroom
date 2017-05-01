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

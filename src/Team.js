class Team {
  constructor(teamname, code) {
    this.name = teamname;
    this.code = code;
    this.users = [];
    this.messages = {};
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

  getUsers() {
    return this.users;
  }

  getSockets() {
    return this.sockets;
  }

  addMessage(id, message) {
    if (this.messages[id]) {
      // update message
    } else {
      this.messages[id] = message;
    }
  }

  getMessages() {
    return this.messages;
  }
}

module.exports = Team;

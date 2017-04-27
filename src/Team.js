class Team {
  constructor(teamname) {
    this.name = teamname;
    this.users = [];
    this.messages = {};
  }

  hasUser(user) {
    return this.users.includes(user);
  }

  addUser(user) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
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

class Tab {
  constructor(id, user) {
    this.id = id;
    this.createdBy = user;
    this.usersViewing = [user];
    // give random color class so this tab can have a random background color
    this.colorClass = Math.floor(Math.random() * (8 - 1)) + 1;
  }

  addUserViewing(user) {
    this.usersViewing.push(user);
  }

  removeUserViewing(user) {
    this.usersViewing.splice(this.usersViewing.indexOf(user), 1);
  }
}

module.exports = Tab;

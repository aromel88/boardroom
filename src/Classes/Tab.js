class Tab {
  constructor(id, user) {
    this.id = id;
    this.createdBy = user;
    this.usersViewing = [user];
  }

  addUserViewing(user) {
    this.usersViewing.push(user);
  }

  removeUserViewing(user) {
    this.usersViewing.splice(this.usersViewing.indexOf(user), 1);
  }
}

module.exports = Tab;

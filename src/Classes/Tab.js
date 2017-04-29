class Tab {
  constructor(id, user) {
    this.id = id;
    this.createdBy = user;
    this.usersViewing = [user];
  }

  addUserViewing(user) {
    this.usersViewing.push(user);
  }
}

module.exports = Tab;

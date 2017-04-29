class Tab {
  constructor(id, user) {
    this.id = id;
    this.createdBy = user;
    this.imgData = [];
    this.usersViewing = [user];
  }

  addUserViewing(user) {
    this.usersViewing.push(user);
  }

  updateImgData(imgData) {
    this.imgData = imgData;
  }

  getImgData() {
    return this.imgData;
  }
}

module.exports = Tab;

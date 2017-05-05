class Message {
  constructor(id, type, content, timestamp, user, diagramId) { // diagramID optional
    this.id = id;
    this.type = type;
    this.content = content;
    this.timestamp = timestamp;
    this.user = user;
    this.diagramId = diagramId;
    // this.avatar = avatar;
  }

  // Can add more methods (e.g. getType, getContent) as needed
}

module.exports = Message;

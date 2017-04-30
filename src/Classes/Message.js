class Message {
  constructor(type, content, timestamp, user) {
    this.type = type;
    this.content = content;
    this.timestamp = timestamp;
    this.user = user;
    // this.avatar = avatar;
  }

  // Can add more methods (e.g. getType, getContent) as needed
}

module.exports = Message;

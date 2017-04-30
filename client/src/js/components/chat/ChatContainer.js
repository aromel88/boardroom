const client = require('../../client.js');

import React from 'react';
import MessageContainer from './MessageContainer';
import SidebarContainer from './SidebarContainer';
import MessageInput from './MessageInput.js';

class ChatContainer extends React.Component {

  constructor() {
    super();

    this.submitMessage = this.submitMessage.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUsers = this.setUsers.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.handleMessageError = this.handleMessageError.bind(this);

    client.on('message', this.setMessage);
    client.on('messageList', this.setMessages);
    client.on('userJoined', this.setUser);
    client.on('userList', this.setUsers);
    client.on('messageError', this.handleMessageError);

    this.state = {
      users: [],
      messages: [],
      username: 'Cool User',
    };
  }

  /**
   * When a new user is sent from the server, add it to the user list.
   * @param {Object} data Data from the socket. data.user contains the
   *                        new message.
   */
  setUser(data) {
    const user = data.user;
    const users = this.state.users.slice();
    users.push(user);

    this.setState({
      users: users,
    });
  }

  /**
   * When the entire user list is sent from the server (on join), overwrite the
   *   user list with the new data.
   * @param {Object} data Data from the socket. data.users contains the user
   *                        list.
   */
  setUsers(data) {
    const users = data.users;
    
    this.setState({
      users: users,
    });
  }

  /**
   * When a new message is sent from the server, add it to the message list.
   * @param {Object} data Data from the socket. data.messageData contains the
   *                        new message.
   */
  setMessage(data) {
    const messages = this.state.messages.slice();
    messages.push(data.messageData);

    this.setState({
      messages: messages,
    });
  }

  /**
   * When the entire message list is sent from the server (on join), overwrite
   *   the message list with the new data.
   * @param  {Object} data Data from the socket. data.messages contains the
   *                         message list.
   */
  setMessages(data) {
    const messages = data.messages;

    this.setState({
      messages: messages,
    });
  }

  handleMessageError(data) {
    console.dir(data.msg);
  }

  submitMessage(e) {
    if (e.keyCode === 13) {
      const inputBox = document.querySelector('#message-input');

      const messages = this.state.messages.slice(); // Get copy of existing message array
      const newMessage = {
        type: 'chat',
        content: inputBox.value,
        timestamp: Date.now(),
        user: this.state.username,
        avatar: './assets/img/usravi_m.png',
      };

      client.emit('createMessage', newMessage);

      inputBox.value = '';
      messages.push(newMessage);

      this.setState({
        messages: messages,
      });
    }
  }

  render() {
    return (
      <div id="chat-container">
        <SidebarContainer users={this.state.users} />
        <MessageContainer username={this.state.username} messages={this.state.messages} />
        <MessageInput submitMessage={this.submitMessage} />
      </div>
    );
  }
}

export default ChatContainer;

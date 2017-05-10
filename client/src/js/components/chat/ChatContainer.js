const client = require('../../client.js');
const app = require('../../app');

import React from 'react';
import MessageContainer from './MessageContainer';
import SidebarContainer from './SidebarContainer';
import MessageInput from './MessageInput.js';
import UsersTypingDisplay from './UsersTypingDisplay.js';

class ChatContainer extends React.Component {

  constructor() {
    super();

    this.isTypingID;

    this.submitMessage = this.submitMessage.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUsers = this.setUsers.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setMessages = this.setMessages.bind(this);
    this.isTyping = this.isTyping.bind(this);
    this.handleMessageError = this.handleMessageError.bind(this);
    this.showTypingUsers = this.showTypingUsers.bind(this);

    client.on('message', this.setMessage);
    client.on('messageList', this.setMessages);
    client.on('userJoined', this.setUser);
    client.on('userList', this.setUsers);
    client.on('messageError', this.handleMessageError);
    client.on('typingUsers', this.showTypingUsers);

    this.state = {
      users: [],
      messages: [],
      usersTyping: [],
    };
  }

  /**
   * When a new user is sent from the server, add it to the user list.
   * @param {Object} data Data from the socket. data.user contains the
   *                        new message.
   */
  setUser(data) {
    const user = { username: data.user };
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
    if (data.users) {
      const users = data.users.map((user) => {
        return { username: user };
      });

      this.setState({
        users: users,
      });
    }
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

  showTypingUsers(data) {
    this.setState({
      usersTyping: data.users,
    });
  }

  submitMessage(e) {
    if (e.keyCode === 13) {
      const inputBox = document.querySelector('#message-input');

      const messages = this.state.messages.slice(); // Get copy of existing message array
      const newMessage = {
        type: 'chat',
        content: inputBox.value,
        timestamp: Date.now(),
        user: app.getName(),
        avatar: './assets/img/usravi_m.png',
        id: `${app.getName()}${new Date().getTime()}`
      };

      client.emit('createMessage', newMessage);

      if (this.isTypingID) {
        clearTimeout(this.isTypingID);
        client.emit('userTyping', { user: app.getName(), typing: false });
      }

      inputBox.value = '';
      messages.push(newMessage);

      this.setState({
        messages: messages,
      });
    }
  }

  isTyping(e) {
    if (e.target.value === '') {
      return;
    }

    client.emit('userTyping', { user: app.getName(), typing: true });

    // reset current timeout
    if (this.isTypingID) {
      clearTimeout(this.isTypingID);
    }

    // send a "has stopped typing" message after 4 seconds
    this.isTypingID = setTimeout(() => {
      client.emit('userTyping', { user: app.getName(), typing: false });
    }, 2000);
  }

  render() {

    return (
      <div id="chat-container" className='canvas-grow'>
        <SidebarContainer users={this.state.users} />
        <MessageContainer username={app.getName()} messages={this.state.messages} />
        <MessageInput submitMessage={this.submitMessage} isTyping={this.isTyping} />
        <UsersTypingDisplay username={app.getName()} users={this.state.usersTyping} />
      </div>
    );
  }

  componentDidMount() {
    client.emit('getUsers', {});
    client.emit('getMessages', {});
  }
}

export default ChatContainer;

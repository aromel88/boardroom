const path = require('path');
const animations = require('../../animations');
import React from 'react';
import MessageContainer from './MessageContainer';
import SidebarContainer from './SidebarContainer';

class ChatContainer extends React.Component {

  constructor() {
    super();

    this.submitMessage = this.submitMessage.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getMessages = this.getMessages.bind(this);

    this.state = {
      users: this.getUsers(),
      messages: this.getMessages(),
      username: 'Cool User',
    };
  }

  getUsers() {
    return [
            { avi: './assets/img/usravi_m.png', username: 'Jesse' },
            { avi: './assets/img/usravi_m.png', username: 'Aaron' },
            { avi: './assets/img/usravi_m.png', username: 'Lathewave' },
            { avi: './assets/img/usravi_m.png', username: 'Margaret' },
           ];
  }

  getMessages() {
    return [
            { avi: './assets/img/usravi_m.png', username: 'Jesse', content: 'This app is great! Conform!', timestamp: 1 },
            { avi: './assets/img/usravi_m.png', username: 'Aaron', content: 'Conform!', timestamp: 2 },
            { avi: './assets/img/usravi_m.png', username: 'Lathewave', content: 'Conform!', timestamp: 3 },
            { avi: './assets/img/usravi_m.png', username: 'Margaret', content: 'Your app tastes like chalk.', timestamp: 4 },
            { avi: './assets/img/usravi_m.png', username: 'Jesse', content: '*Snaps fingers in Z*', timestamp: 5 },
           ];
  }

  submitMessage(e) {
    if (e.keyCode === 13) {
      const inputBox = document.querySelector('#message-input');

      const messages = this.state.messages.slice(); // Get copy of existing message array
      const newMessage = {
        avi: './assets/img/usravi_m.png',
        username: this.state.username,
        content: inputBox.value,
        timestamp: Date.now(),
      };

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
        <div id='sidebar-container'>
          <SidebarContainer users={this.state.users} />
        </div>
        <div id='messages-container'>
          <MessageContainer messages={this.state.messages} />
        </div>
        <div id='message-input-container'>
          <input type='text' id='message-input' placeholder='Write a message' onClick={this.submitMessage} />
        </div>
      </div>
    );
  }
}

export default ChatContainer;

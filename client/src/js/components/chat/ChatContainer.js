const path = require('path');
const animations = require('../../animations');
import React from 'react';
import MessageContainer from './MessageContainer';
import SidebarContainer from './SidebarContainer';

class ChatContainer extends React.Component {

  constructor() {
    super();

    this.getUsers = this.getUsers.bind(this);
    this.getMessages = this.getMessages.bind(this);

    this.state = {
      users: [
              { avi: './assets/img/usravi_m.png', username: 'Jesse' },
              { avi: './assets/img/usravi_m.png', username: 'Aaron' },
              { avi: './assets/img/usravi_m.png', username: 'Lathewave' },
              { avi: './assets/img/usravi_m.png', username: 'Margaret' },
             ],
      messages: [
                  { avi: './assets/img/usravi_m.png', username: 'Jesse', content: 'This app is great! Conform! This app is great! Conform! This app is great! Conform! This app is great! Conform! This app is great! Conform! This app is great! Conform!', timestamp: 1 },
                  { avi: './assets/img/usravi_m.png', username: 'Aaron', content: 'Conform!', timestamp: 2 },
                  { avi: './assets/img/usravi_m.png', username: 'Lathewave', content: 'Conform!', timestamp: 3 },
                  { avi: './assets/img/usravi_m.png', username: 'Margaret', content: 'Your app tastes like chalk.', timestamp: 4 },
                  { avi: './assets/img/usravi_m.png', username: 'Jesse', content: '*Snaps fingers in Z*', timestamp: 5 },
                ],
    };
  }

  getUsers() {
    this.setState({
      users: [
              { avi: './assets/img/usravi_m.png', username: 'Jesse' },
              { avi: './assets/img/usravi_m.png', username: 'Aaron' },
              { avi: './assets/img/usravi_m.png', username: 'Lathewave' },
              { avi: './assets/img/usravi_m.png', username: 'Margaret' },
             ],
    });
  }

  getMessages() {
    this.setState({
      messages: [
                  { avi: './assets/img/usravi_m.png', username: 'Jesse', content: 'This app is great! Conform!', timestamp: 1 },
                  { avi: './assets/img/usravi_m.png', username: 'Aaron', content: 'Conform!', timestamp: 2 },
                  { avi: './assets/img/usravi_m.png', username: 'Lathewave', content: 'Conform!', timestamp: 3 },
                  { avi: './assets/img/usravi_m.png', username: 'Margaret', content: 'Your app tastes like chalk.', timestamp: 4 },
                  { avi: './assets/img/usravi_m.png', username: 'Jesse', content: '*Snaps fingers in Z*', timestamp: 5 },
                ],
    });
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
          <input type='text' id='message-input' placeholder='Write a message' />
        </div>
      </div>
    );
  }
}

export default ChatContainer;

const app = require('../../app');
const client = require('../../client');
const canvas = require('../../canvas');
import React from 'react';

class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  reopenDiagram(id) {
    const curTab = canvas.getActiveTab();
    const user = app.getName();
    client.emit('reopenDiagram', {
      user,
      curTab,
      id
    });
  }

  render() {
    let avatarPath = this.props.message.avatar;
    if (!avatarPath || avatarPath == '') {
      avatarPath = './assets/img/usravi_m.png';
    }
    let className = 'message-wrapper';
    if (app.getName() === this.props.message.user) {
      className += ' self-message';
    }
    if (this.props.message.type === 'diagram') {
      className += ' diagram-message';
    }
    const id = this.props.message.id;
    return (
      <div className={className} id={id} onClick={() => this.reopenDiagram(id) }>
        <img className='message-avatar' src={avatarPath} alt={avatarPath} />
        <p className='message-username'>{this.props.message.user}</p>
        {/* May need to change to handle diagrams vs. text messages */}
        <p className='message-text'>{this.props.message.content}</p>
        <p className='message-timestamp'>{new Date(this.props.message.timestamp).toLocaleString()}</p>
      </div>
    );
  }
}

export default Message;

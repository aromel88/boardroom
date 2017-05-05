const app = require('../../app');
import React from 'react';

class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let avatarPath = this.props.message.avatar;
    if (!avatarPath || avatarPath == '') {
      avatarPath = './assets/img/usravi_m.png';
    }
    let className = 'message-wrapper';
    //if (this.props.username === this.props.message.user) {
    if (app.getName() === this.props.message.user) {
      className += ' self-message';
    }
    if (this.props.message.type === 'diagram') {
      className += ' diagram-message';
    }
    return (
      <div className={className}>
        <img className='message-avatar' src={avatarPath} alt={avatarPath} />
        <p className='message-username'>{this.props.message.user}</p>
        {/* May need to change to handle diagrams vs. text messages */}
        <p className='message-text'>{this.props.message.content}</p>
      </div>
    );
  }
}

export default Message;

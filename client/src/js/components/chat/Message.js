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

    if (this.props.username === this.props.message.user) {
      return (
        <div className='message-wrapper self-message'>
          <img className='message-avatar' src={avatarPath} alt={avatarPath} />
          <p className='message-username'>{this.props.message.user}</p>
          {/* May need to change to handle diagrams vs. text messages */}
          <p className='message-text'>{this.props.message.content}</p>
        </div>
      );
    } else {
      return (
        <div className='message-wrapper'>
          <img className='message-avatar' src={avatarPath} alt={avatarPath} />
          <p className='message-username'>{this.props.message.user}</p>
          {/* May need to change to handle diagrams vs. text messages */}
          <p className='message-text'>{this.props.message.content}</p>
        </div>
      );
    }
  }
}

export default Message;

import React from 'react';

class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  // TODO: Need to figure out user/avatar architecture

  render() {
    if (this.props.username === this.props.message.username) {
      return (
        <div className='message-wrapper self-message'>
          <img className='message-avatar' src={this.props.message.avi} alt={this.props.message.username} />
          <p className='message-username'>{this.props.message.username}</p>
          {/* May need to change to handle diagrams vs. text messages */}
          <p className='message-text'>{this.props.message.content}</p>
        </div>
      );
    } else {
      return (
        <div className='message-wrapper'>
          <img className='message-avatar' src={this.props.message.avi} alt={this.props.message.username} />
          <p className='message-username'>{this.props.message.username}</p>
          {/* May need to change to handle diagrams vs. text messages */}
          <p className='message-text'>{this.props.message.content}</p>
        </div>
      );
    }
  }
}

export default Message;

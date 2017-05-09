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
    const id = this.props.message.id;
    if (!avatarPath || avatarPath == '') {
      avatarPath = './assets/img/usravi_m.png';
    }
    let className = 'message-wrapper';
    let onClickHandler;
    if (app.getName() === this.props.message.user) {
      className += ' self-message';
    }
    if (this.props.message.type === 'diagram') {
      className += ' diagram-message';
      onClickHandler = () => this.reopenDiagram(id);
    } else {
      onClickHandler = () => {console.log('someday we would do message editing')};
    }
    return (
      <div className={className} id={id} onClick={onClickHandler}>
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

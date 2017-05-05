const app = require('../../app');
const client = require('../../client');
const canvas = require('../../canvas');
import React from 'react';

class Message extends React.Component {

  constructor(props) {
    super(props);
  }

  reopenDiagram(diagramId) {
    //const diagramId = e.target.id;
    console.log('diagramID: ' + diagramId);
    if (diagramId.indexOf('message') > -1) return;
    const curTab = canvas.getActiveTab();
    const user = app.getName();
    client.emit('reopenDiagram', {
      user,
      curTab,
      diagramId
    });
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
    const id = this.props.message.diagramId;
    return (
      <div className={className} id={id} onClick={() => this.reopenDiagram(id) }>
        <img className='message-avatar' src={avatarPath} alt={avatarPath} />
        <p className='message-username'>{this.props.message.user}</p>
        {/* May need to change to handle diagrams vs. text messages */}
        <p className='message-text'>{this.props.message.content}</p>
      </div>
    );
  }
}

export default Message;

import React from 'react';
import Message from './Message';

class MessageContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    // Sort messages by timestamp - this could potentially be expensive to do every time we render
    const messages = this.props.messages.sort((msg1, msg2) => {
      return msg1.timestamp - msg2.timestamp;
    }).map((message) => {
      return (<Message message={message} key={message.timestamp + message.username} />);
    });

    return (<div id='messages'>{messages}</div>);
  }
}

export default MessageContainer;

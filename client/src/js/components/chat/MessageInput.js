import React from 'react';

class MessageInput extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='message-input-container' className='canvas-grow'>
        <input
          type='text'
          id='message-input'
          placeholder='Write a message'
          onKeyUp={this.props.submitMessage}
          onInput={this.props.isTyping}
        />
      </div>
    );
  }
}

export default MessageInput;

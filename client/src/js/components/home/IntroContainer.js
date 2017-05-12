import React from 'react';

class IntroContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      teamImage: './assets/img/intro-users.png',
      messageImage: './assets/img/intro-messages.png',
      drawingImage: './assets/img/intro-diagram-with-drawing.png',
    }
  }

  render() {
    return (
      <div id='intro-container'>
        <div id='intro-team'>
          <h1>Work with your team</h1>
          <img src={this.state.teamImage} alt='Team img' />
        </div>
        <div id='intro-messages'>
          <h1>Communicate in real-time</h1>
          <img src={this.state.messageImage} alt='Message img' />
        </div>
        <div id='intro-drawing'>
          <h1>Diagram and draw together</h1>
          <img src={this.state.drawingImage} alt='Drawing img' />
        </div>
      </div>
    );
  }
}

export default IntroContainer;

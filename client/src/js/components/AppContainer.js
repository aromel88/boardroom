
import React from 'react';
import ChatContainer from './chat/ChatContainer';
import CanvasContainer from './canvas/CanvasContainer';

class AppContainer extends React.Component {

  constructor() {
    super();
  }

  // render Home page
  render() {
    return (
      <div>
        <ChatContainer />
        <CanvasContainer />
      </div>
    );
  }
}

export default AppContainer;

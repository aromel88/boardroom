
import React from 'react';
import ChatContainer from './chat/ChatContainer';

// test class to make sure react is working
class AppContainer extends React.Component {

  constructor() {
    super();
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <ChatContainer />
        {/*<CanvasContainer />*/}
      </div>
    );
  }
}

export default AppContainer;

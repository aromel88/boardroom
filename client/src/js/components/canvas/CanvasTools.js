
import React from 'react';

// test class to make sure react is working
class CanvasTools extends React.Component {

  constructor(props) {
    super(props);
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div id='canvas-tools'>
        <h1>Canvas Tools Will Go Here</h1>
      </div>
    );
  }
}

export default CanvasTools;

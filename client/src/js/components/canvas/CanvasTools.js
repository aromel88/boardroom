
const canvas = require('../../canvas');
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
      <div id='canvas-tools' className='canvas-slide'>
        <div
          id='done-editing-button'
          className='canvas-tool'
          onClick={this.props.doneEditingAction}
        >
          <p>Done Editing</p>
        </div>
        <div
          id='clear-canvas-button'
          className='canvas-tool'
          onClick={this.props.clearCanvasAction}
        >
          <p>Clear Canvas</p>
        </div>
      </div>
    );
  }
}

export default CanvasTools;


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
        <img
          src={this.props.toolDisplayImg}
          id='done-editing-button'
          className='canvas-tool'
          onClick={this.props.toolToggleAction}
          title={this.props.curTool}
        />
        <img
          src='assets/img/start-over.png'
          id='clear-canvas-button'
          className='canvas-tool'
          onClick={this.props.clearCanvasAction}
          title='Start Over'
        />
        <img
          src='assets/img/done.png'
          id='done-editing-button'
          className='canvas-tool'
          onClick={this.props.doneEditingAction}
          title='Done'
        />
      </div>
    );
  }
}

export default CanvasTools;


const canvas = require('../../canvas');
import React from 'react';

// test class to make sure react is working
class CanvasTabBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div id='canvas-tab-bar' className='canvas-slide'>
        <div id='canvas-slide-button' className='canvas-tab' onClick={canvas.toggleCanvas}><p>New</p></div>
      </div>
    );
  }
}

export default CanvasTabBar;

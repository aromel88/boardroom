
const canvas = require('../../canvas');
import React from 'react';

// test class to make sure react is working
class CanvasTabBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // render Home page
  render() {
    const tabNodes = this.props.canvasTabs.map(function(tab) {
      return (
        <div id={tab.id} className='canvas-tab' onClick={this.props.tabOpenAction}></div>
      );
    }.bind(this));

    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div id='canvas-tab-bar' className='canvas-slide'>
        {tabNodes}
      </div>
    );
  }
}

export default CanvasTabBar;

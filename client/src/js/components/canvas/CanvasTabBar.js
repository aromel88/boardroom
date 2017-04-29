
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
      const tabClassName = this.props.activeTab === tab.id ? 'active-tab' : 'canvas-tab';
      return (
        <div key={tab.id} id={tab.id} className={tabClassName} onClick={this.props.tabOpenAction}></div>
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

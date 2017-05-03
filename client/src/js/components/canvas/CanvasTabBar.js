
const canvas = require('../../canvas');
import React from 'react';

// test class to make sure react is working
class CanvasTabBar extends React.Component {

  constructor(props) {
    super(props);
  }

  // render Home page
  render() {
    const tabNodes = this.props.canvasTabs.map(function(tab, i) {
      const tabClassName = this.props.activeTab === tab.id ? 'active-tab' : 'canvas-tab';
      const tabClassWithColor = `${tabClassName} _${tab.colorClass}`;
      const usersInTab = tab.usersViewing.map(function(user) {
        return (
          <p key={user} className='tab-userlist-item'>{user}</p>
        )
      });
      return (
        <div key={tab.id} id={tab.id} className={tabClassWithColor} onClick={this.props.tabOpenAction}>
          <div id='tab-bar-user-list' className='tab-userlist'>{usersInTab}</div>
        </div>
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

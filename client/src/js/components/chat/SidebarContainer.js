import React from 'react';
import User from './User';

class SidebarContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users.map((user) => {
      return (<User user={user}  key={performance.now() + user.username} />);
    });

    return (
      <div id='sidebar-container' className='sidebar'>
        <h3>Users</h3>
        <ul id='user-list'>{users}</ul>
        <input type='button' className='prem-but' id='premium-button' name='premium-button'
          value='Go Premium' onClick={this.props.showPremiumAction} />
      </div>
    );
  }
}

export default SidebarContainer;

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
      <div id='sidebar-container'>
        <h3>Users</h3>
        <ul id='user-list'>{users}</ul>
      </div>
    );
  }
}

export default SidebarContainer;

import React from 'react';
import User from './User';

class UserListContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const users = this.props.users.map((user) => {
      return <User user={user} />
    });

    return <ul id='user-list'>{users}</ul>;
  }
}

export default UserListContainer;

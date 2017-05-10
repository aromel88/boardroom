import React from 'react';

class UsersTypingDisplay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let classes = 'typing-list';
    let userList = '';
    let users = this.props.users;

    const username = this.props.username;
    if (users.includes(username)) {
      console.log('original: ');
      console.dir(users);
      users.splice(users.indexOf(username), 1);
    }

    if (users && users.length > 0) {
      userList = users[0];
      for (let i = 1; i < users.length; i++) {
        userList += ', ' + users[i];
      }

      console.log('modified: ');
      console.dir(users);

      users.length === 1 ? userList += ' is' : userList += ' are';
      userList += ' typing. . .';
    } else {
      classes += ' invisible-class';
    }

    return (
      <div className={classes}>
        <span>{userList}</span>
      </div>
    );
  }
}

export default UsersTypingDisplay;

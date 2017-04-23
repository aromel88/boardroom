import React from 'react';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='login-controls'>
        <input type='text' id='team-name' name='team-name' placeholder='Team name' />
        <input type='text' id='join-code' name='join-code' placeholder='Join code' />
        <input type='text' id='user-name' name='user-name' placeholder='Username' />
        <input type='button' id='join-button' name='join-button'
          value={this.props.joinType} onClick={this.props.joinAction} />
      </div>
    );
  }
}

export default LoginContainer;

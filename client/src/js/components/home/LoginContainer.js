import React from 'react';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='login-container'>
        <div id='login-controls'>
          <input type='text' id='team-name' name='team-name' />
          <input type='text' id='join-code' name='join-code' />
          <input type='text' id='user-name' name='user-name' />
          <input type='button' id='join-button' name='join-button'
            value={this.props.joinType} onClick={this.props.joinAction} />
        </div>
      </div>
    );
  }
}

export default LoginContainer;

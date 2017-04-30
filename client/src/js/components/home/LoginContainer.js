import React from 'react';

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);

    this.keyup = this.keyup.bind(this);
  }

  keyup(e) {
    // if the key is enter then submit
    if (e.keyCode === 13) {
      this.props.joinAction();
    }
  }

  render() {
    return (
      <div id='login-controls'>
        <input type='text' id='team-name' name='team-name' placeholder='Team name'
          onChange={this.props.inputOnChange}
          onKeyUp={this.keyup}
        />
        <input type='text' id='join-code' name='join-code' placeholder='Join code'
          onChange={this.props.inputOnChange}
          onKeyUp={this.keyup}
        />
        <input type='text' id='user-name' name='user-name' placeholder='Username'
          onChange={this.props.inputOnChange}
          onKeyUp={this.keyup}
        />
        <input type='button' id='join-button' name='join-button'
          value={this.props.joinType} onClick={this.props.joinAction} />
      </div>
    );
  }
}

export default LoginContainer;

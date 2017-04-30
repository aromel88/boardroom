import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='user-wrapper'>
        {/* TODO: src would presumably be an image lookup via username */}
        <img className='user-avatar' src={this.props.user.avatar} alt='./assets/img/usravi_m.png' />
        <p className='username'>{this.props.user.username}</p>
      </div>
    );
  }
}

export default User;

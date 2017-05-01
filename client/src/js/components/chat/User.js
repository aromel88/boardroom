import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let avatarPath = this.props.user.avatar;
    if (!avatarPath || avatarPath == '') {
      avatarPath = './assets/img/usravi_m.png';
    }

    return (
      <div className='user-wrapper'>
        {/* TODO: src would presumably be an image lookup via username */}
        <img className='user-avatar' src={avatarPath} alt={this.props.user.username} />
        <p className='username'>{this.props.user.username}</p>
      </div>
    );
  }
}

export default User;

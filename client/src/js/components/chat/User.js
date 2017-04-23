import React from 'react';

class User extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='user-wrapper'>
        {/* TODO: src would presumably be an image lookup via username */}
        <img className='avatar' src={this.props.user.avi} alt={this.props.user.username} />
        <p className='username'>{this.props.user.username}</p>
      </div>
    );
  }
}

export default User;

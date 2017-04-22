import React from 'react';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
        <input type='button' className='navButton' value={this.props.navItem} onClick={this.props.navClick} />
      </nav>
    );
  }
}

export default Nav;

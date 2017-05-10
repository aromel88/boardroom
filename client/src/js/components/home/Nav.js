import React from 'react';

class Nav extends React.Component {

  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    this.props.navClick();
    this.props.errorClear();
  }

  render() {
    return (
      <nav>
        <img src='assets/img/logo-75x75.png' alt="BoardRoom logo" />
        <input type='button' className='navButton' value={this.props.navItem} onClick={this.clickHandler} />
      </nav>
    );
  }
}

export default Nav;

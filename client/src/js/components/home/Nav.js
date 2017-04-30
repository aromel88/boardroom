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
        <input type='button' className='navButton' value={this.props.navItem} onClick={this.clickHandler} />
      </nav>
    );
  }
}

export default Nav;

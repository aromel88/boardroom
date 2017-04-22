import React from 'react';

class HeroContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='hero-container'>
        <h1>{this.props.heroText}</h1>
        <img alt='Hero Img' src={this.props.heroImg} />
      </div>
    );
  }
}

export default HeroContainer;

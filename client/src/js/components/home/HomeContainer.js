import React from 'react';
import HeroContainer from './HeroContainer'

// test class to make sure react is working
class HomeContainer extends React.Component {

  constructor() {
    super();

    // set initial state
    this.state = {
      heroText: 'Welcome to the Home Page',
      heroImg: './assets/img/logo.png',
    }

    this.clickImg = this.clickImg.bind(this);
  }

  clickImg() {
    this.setState({
      heroText: 'The button was clicked'
    });
  }

  // render Home page
  render() {
    return (
      <HeroContainer
        heroText={this.state.heroText}
        heroImg={this.state.heroImg}
        imgClick={this.clickImg}
      />
    );
  }
}

export default HomeContainer;

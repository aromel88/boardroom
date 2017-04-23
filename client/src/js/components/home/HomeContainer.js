const app = require('../../app');
const animations = require('../../animations');
import React from 'react';
import Nav from './Nav';
import HeroContainer from './HeroContainer';
import LoginContainer from './LoginContainer';

// test class to make sure react is working
class HomeContainer extends React.Component {

  constructor() {
    super();

    this.createTeamPage = this.createTeamPage.bind(this);
    this.setCreateTeamPageState = this.setCreateTeamPageState.bind(this);
    this.homePage = this.homePage.bind(this);
    this.setHomePageState = this.setHomePageState.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);

    // set initial state
    this.state = {
      navItem: 'Start a team',
      navAction: this.createTeamPage,
      heroText: 'Plan, discuss, win.',
      heroImg: './assets/img/heroimg.svg',
      joinType: 'Join your team',
      joinAction: this.joinRoom,
    }
  }

  setCreateTeamPageState() {
    this.setState({
      navItem: 'Back',
      navAction: this.homePage,
      heroText: 'Start your brainstorming here',
      joinType: 'Create your team',
      joinAction: this.createRoom
    });
  }

  setHomePageState() {
    this.setState({
      navItem: 'Start a team',
      navAction: this.createTeamPage,
      heroText: 'Plan, discuss, win.',
      joinType: 'Join your team',
      joinAction: this.joinRoom
    });
  }

  togglePage(action) {
    // animate login controls
    let toAnimation = { right: '-400px' };
    let backAnimation = { delay: 0.3, right: '75px' };
    animations.animateWithRewind(
      document.querySelector('#login-controls'),
      0.3, toAnimation, backAnimation, action
    );

    // animate hero text
    toAnimation = { opacity: '0' };
    backAnimation = { delay: 0.3, opacity: '1' };
    animations.animateWithRewind(
      document.querySelector('#hero-container').childNodes[0],
      0.3, toAnimation, backAnimation
    );
  }

  appPage() {
    const toAnimation = { opacity: 0 };
    const backAnimation = { delay: 0.3, opacity: 1 };
    animations.animateWithRewind(
      document.querySelector('#app'),
      0.3, toAnimation, backAnimation, app.renderApp
    );
  }

  homePage() {
    this.togglePage(this.setHomePageState);
  }

  createTeamPage() {
    this.togglePage(this.setCreateTeamPageState);
  }

  joinRoom() {
    // TODO: join room logic (client emit) and switch to main app page
    console.log('joining room');
    this.appPage();
  }

  createRoom() {
    // TODO: create room logic (client emit) and switch to main app page
    console.log('creating room');
    this.appPage();
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <Nav navItem={this.state.navItem} navClick={this.state.navAction} />
        <div id='home-container'> {/* wrapper for styling purposes */}
          <HeroContainer
            heroText={this.state.heroText}
            heroImg={this.state.heroImg}
          />
          <LoginContainer joinType={this.state.joinType} joinAction={this.state.joinAction} />
        </div>
      </div>
    );
  }
}

export default HomeContainer;

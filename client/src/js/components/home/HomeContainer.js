import React from 'react';
import Nav from './Nav';
import HeroContainer from './HeroContainer';
import LoginContainer from './LoginContainer';

// test class to make sure react is working
class HomeContainer extends React.Component {

  constructor() {
    super();

    this.createTeamPage = this.createTeamPage.bind(this);
    this.goHome = this.goHome.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);

    // set initial state
    this.state = {
      navItem: 'Start a team',
      navAction: this.createTeamPage,
      heroText: 'Welcome to the Home Page',
      heroImg: './assets/img/heroimg.svg',
      joinType: 'Join your team',
      joinAction: this.joinRoom,
    }

  }

  goHome() {
    // TODO: animations
    this.setState({
      navItem: 'Start a team',
      navAction: this.createTeamPage,
      joinType: 'Join your team',
      joinAction: this.joinRoom
    });
  }

  createTeamPage() {
    // TODO: animations
    this.setState({
      navItem: 'Back',
      navAction: this.goHome,
      joinType: 'Create your team',
      joinAction: this.createRoom
    });
  }

  joinRoom() {
    // TODO: join room logic (client emit) and switch to main app page
    console.log('joining room');
  }

  createRoom() {
    // TODO: create room logic (client emit) and switch to main app page
    console.log('creating room');
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

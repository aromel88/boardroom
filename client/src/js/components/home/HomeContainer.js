const app = require('../../app');
const animations = require('../../animations');
const client = require('../../client.js');
import React from 'react';
import Nav from './Nav';
import HeroContainer from './HeroContainer';
import LoginContainer from './LoginContainer';
import IntroContainer from './IntroContainer.js';

// test class to make sure react is working
class HomeContainer extends React.Component {

  constructor() {
    super();

    this.createTeamPage = this.createTeamPage.bind(this);
    this.setCreateTeamPageState = this.setCreateTeamPageState.bind(this);
    this.homePage = this.homePage.bind(this);
    this.setHomePageState = this.setHomePageState.bind(this);
    this.validInputs = this.validInputs.bind(this);
    this.connectToServer = this.connectToServer.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
    this.joinSuccess = this.joinSuccess.bind(this);
    this.joinFailure = this.joinFailure.bind(this);
    this.handleErr = this.handleErr.bind(this);
    this.clearError = this.clearError.bind(this);

    // set initial state
    this.state = {
      navItem: 'Start a team',
      navAction: this.createTeamPage,
      heroText: 'Chat, brainstorm and draw collaboratively',
      heroImg: './assets/img/heroimg.svg',
      joinType: 'Join your team',
      joinAction: this.joinRoom,
      error: 'no-error',
      errorMessage: ''
    }
  }

  setCreateTeamPageState() {
    this.setState({
      navItem: 'Back',
      navAction: this.homePage,
      heroText: 'Start your team here',
      joinType: 'Create your team',
      joinAction: this.createRoom
    });
  }

  setHomePageState() {
    this.setState({
      navItem: 'Start a team',
      navAction: this.createTeamPage,
      heroText: 'Chat, brainstorm and draw collaboratively',
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

  connectToServer(team, code, user, joinType) {
    client.connect();
    client.on('joinSuccess', this.joinSuccess);
    client.on('joinFailure', this.joinFailure);
    const connectData = {
      team: team,
      code: code,
      user: user,
      type: joinType
    };

    client.emit('join', connectData);
  }

  validInputs(team, code, user) {
    if (team === '' || code === '' || user === '') {
      this.handleErr('Must fill out all inputs');
      return false;
    }
    if (!team.match(/^[0-9a-zA-Z]+$/)) {
      this.handleErr('Numbers and letters only for team name');
      return false;
    }
    if (team.length > 10) {
      this.handleErr('Team name length is limited to 10 characters');
      return false;
    }
    if (!user.match(/^[0-9a-zA-Z]+$/)) {
      this.handleErr('Numbers and letters only for team name');
      return false;
    }
    if (user.length > 10) {
      this.handleErr('Team name length is limited to 10 characters');
      return false;
    }
    if (code.length > 15) {
      this.handleErr('Room Code name length is limited to 15 characters');
      return false;
    }

    return true;
  };

  joinRoom() {
    console.log('joining room');
    const team = document.querySelector('#team-name').value;
    const code = document.querySelector('#join-code').value;
    const user = document.querySelector('#user-name').value;
    if (this.validInputs(team, code, user)) {
      this.connectToServer(team, code, user, 'join');
    }
  }

  createRoom() {
    console.log('creating room');
    const team = document.querySelector('#team-name').value;
    const code = document.querySelector('#join-code').value;
    const user = document.querySelector('#user-name').value;
    if (this.validInputs(team, code, user)) {
      this.connectToServer(team, code, user, 'create');
    }
  }

  joinSuccess(data) {
    console.dir(data);
    app.setupTeam(data.team, data.code, data.user, data.existingTabs);
    this.appPage();
  }

  joinFailure(err) {
    this.handleErr(err.err);
    client.disconnect();
  }

  handleErr(errorMessage) {
    this.setState({ error: 'error', errorMessage: errorMessage  });
    animations.handleError();
  }

  clearError() {
    this.setState( { error: 'no-error', errorMessage: '' });
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <Nav navItem={this.state.navItem} navClick={this.state.navAction} errorClear={this.clearError} />
        <div id='home-container'> {/* wrapper for styling purposes */}
          <HeroContainer
            heroText={this.state.heroText}
            heroImg={this.state.heroImg}
          />
          <LoginContainer
            joinType={this.state.joinType}
            joinAction={this.state.joinAction}
            inputOnChange={this.clearError}
          />
        </div>
        <div className={this.state.error}>{this.state.errorMessage}</div>
        <div>
          <IntroContainer />
        </div>
      </div>
    );
  }
}

export default HomeContainer;

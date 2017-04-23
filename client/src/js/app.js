
const animations = require('./animations');
import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from './components/home/HomeContainer';
import AppContainer from './components/AppContainer';

const renderApp = () => {
  ReactDOM.render(
      <AppContainer />,
      document.querySelector('#app'), () => {
        // module initializations
      }
    );
};

const init = () => {
  ReactDOM.render(
      <HomeContainer />,
      document.querySelector('#app'), () => {
        // module initializations
      }
    );
};

window.addEventListener('load', init);

module.exports.renderApp = renderApp;

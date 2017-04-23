
const animations = require('./animations');
import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from './components/home/HomeContainer';
import ChatContainer from './components/chat/ChatContainer';

const renderApp = () => {
  ReactDOM.render(
      <ChatContainer />,
      document.querySelector('#app'), () => {
        // module initializations if needed
      }
    );
};

const init = () => {
  ReactDOM.render(
      <HomeContainer />,
      document.querySelector('#app'), () => {
        // module initializations if needed
      }
    );
};

window.addEventListener('load', init);

module.exports.renderApp = renderApp;


const animations = require('./animations');
import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from './components/home/HomeContainer';

import ChatContainer from './components/chat/ChatContainer.js';

const init = () => {
  ReactDOM.render(
      <ChatContainer />,
      document.querySelector('#app'), () => {
        // animations.init();
      }
    );
};

window.addEventListener('load', init);

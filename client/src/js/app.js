
const animations = require('./animations');
import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import HomeContainer from './components/home/HomeContainer';

const init = () => {
  ReactDOM.render(
      <HomeContainer />,
      document.querySelector('#app'), () => {
        animations.init();
      }
    );
};

window.addEventListener('load', init);

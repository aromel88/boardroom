import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Joust from './components/Joust';

const init = () => {
  ReactDOM.render(
      <Joust />,
      document.querySelector('#app')
    );
};

window.addEventListener('load', init);

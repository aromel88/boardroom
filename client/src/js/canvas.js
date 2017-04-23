const animations = require('./animations');
import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import CanvasContainer from './components/home/CanvasContainer';

const reRenderCanvas = (imgData) => {
  ReactDOM.render(
      <CanvasContainer imgData={imgData} />,
      document.querySelector('#canvas-container'), () => {
        // module initializations if needed
      }
    );
};

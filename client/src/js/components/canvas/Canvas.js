
import React from 'react';

// test class to make sure react is working
class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div id='canvas-container' className='canvas-slide'>
        <canvas id='top-canvas' width='400' height='800' className='canvas-slide'></canvas>
        <canvas id='main-canvas' width='400' height='800' className='canvas-slide'></canvas>
      </div>
    );
  }
}

export default Canvas;

const app = require('../../app');
const canvas = require('../../canvas');
const animations = require('../../animations');
import React from 'react';
import CanvasTools from './CanvasTools';

// test class to make sure react is working
class CanvasContainer extends React.Component {

  constructor(props) {
    super(props);

    this.setImageData = this.setImageData.bind(this);
    // set initial state
    this.state = {
      drawColor: 'black',
      lineWeight: 1,
      imgData: this.props.imgData,
    }
    
    canvas.setUpdateCallback(this.setImageData); 
  }
  
  setImageData(data) {
    this.setState({ imgData: data });
  };

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <canvas id='top-canvas' width='400' height='800'></canvas>
        <canvas id='main-canvas' width='400' height='800'></canvas>
        <CanvasTools />
      </div>
    );
  }
}

export default CanvasContainer;

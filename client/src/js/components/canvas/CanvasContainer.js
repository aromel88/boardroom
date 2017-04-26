const app = require('../../app');
const canvas = require('../../canvas');
const animations = require('../../animations');
import React from 'react';
import Canvas from './Canvas';
import CanvasTabBar from './CanvasTabBar';
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
      canvasTabs: [],
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
        <CanvasTabBar canvasTabs={this.state.canvasTabs} />
        <Canvas />
        <CanvasTools />
      </div>
    );
  }
}

export default CanvasContainer;

const app = require('../../app');
const animations = require('../../animations');
import React from 'react';
//import CanvasTools from './CanvasTools';

// test class to make sure react is working
class CanvasContainer extends React.Component {

  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      drawColor: 'black',
      lineWeight: 1,
      imgData: this.props.imgData,
    }
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <Canvas
          drawColor={this.state.drawColor}
          lineWeight={this.state.lineWeight}
          imgData={this.state.imgData}
        {/*<CanvasTools />*/}
      </div>
    );
  }
}

export default CanvasContainer;

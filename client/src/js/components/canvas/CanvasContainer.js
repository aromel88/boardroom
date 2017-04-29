const app = require('../../app');
const client = require('../../client');
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

    this.tabCreated = this.tabCreated.bind(this);
    this.createTab = this.createTab.bind(this);
    this.openTab = this.openTab.bind(this);
    this.setImageData = this.setImageData.bind(this);

    // set initial state
    this.state = {
      drawColor: 'black',
      lineWeight: 1,
      imgData: this.props.imgData,
      canvasTabs: [],
    }

    canvas.setUpdateCallback(this.setImageData);
    client.on('tabCreated', this.tabCreated);
  }

  tabCreated(tabData) {
    this.setState({ canvasTabs: tabData });
    canvas.toggleCanvas();
  }

  createTab() {
    const tabID = `${app.getName()}${new Date().getTime()}`;
    client.emit('createTab', { id: tabID, user: app.getName() });
  }

  openTab(e) {
    console.log('open tab' + e.target.id);
  }

  setImageData(data) {
    this.setState({ imgData: data });
  };

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <div id='canvas-slide-button' onClick={this.createTab}><p>New</p></div>
        <CanvasTabBar canvasTabs={this.state.canvasTabs} tabOpenAction={this.openTab} />
        <Canvas />
        <CanvasTools />
      </div>
    );
  }
}

export default CanvasContainer;

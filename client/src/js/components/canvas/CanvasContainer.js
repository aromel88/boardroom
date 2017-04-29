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

    this.tabsUpdated = this.tabsUpdated.bind(this);
    this.createTab = this.createTab.bind(this);
    this.tabOpened = this.tabOpened.bind(this);
    this.openTab = this.openTab.bind(this);

    // set initial state
    this.state = {
      drawColor: 'black',
      lineWeight: 1,
      canvasTabs: app.getInitialTabs(),
      activeTab: ''
    }

    canvas.setUpdateCallback(this.setImageData);
    client.on('tabsUpdated', this.tabsUpdated);
    client.on('tabOpened', this.tabOpened);
  }

  tabOpened(data) {
    canvas.receiveCanvasData(data);
    canvas.setActiveTab(data.id);
    this.setState({ activeTab: data.id });
  }

  tabsUpdated(tabData) {
    this.setState({ canvasTabs: tabData });
  }

  createTab() {
    const tabID = `${app.getName()}${new Date().getTime()}`;
    this.setState({ activeTab: tabID });
    canvas.setActiveTab(tabID);
    client.emit('createTab', { id: tabID, user: app.getName() });
    canvas.toggleCanvas();
  }

  openTab(e) {
    const openID = e.target.id;
    if (openID === this.state.activeTab) {
      return;
    }
    if (!canvas.canvasOpen()) {
      canvas.toggleCanvas();
    }
    client.emit('openTab',
      {
        curID: this.state.activeTab,
        openID: openID,
        user: app.getName()
      });
    this.setState({ activeTab: openID });
    canvas.setActiveTab(openID);
  }

  // render Home page
  render() {
    return (
      // everything wrapped in div to avoid error 'Adjacent JSX elements must be wrapped in an enclosing tag'
      <div>
        <div id='canvas-slide-button' onClick={this.createTab}><p>New</p></div>
        <CanvasTabBar
          activeTab={this.state.activeTab}
          canvasTabs={this.state.canvasTabs}
          tabOpenAction={this.openTab}
        />
        <Canvas />
        <CanvasTools />
      </div>
    );
  }
}

export default CanvasContainer;

import React from 'react';

class PremiumContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id='premium-container' className='sidebar'>

        <div id='close-premium' onClick={this.props.closePremiumAction}>X</div>
        <input type='button' id='go-premium-button' name='go-premium-button' className='prem-but'
          value="Let's do it!" />
        <h1>Premium</h1>
        <h1>Features</h1>
        <ul id='premium-features'>
          <li>Unlimited storage of chat logs and diagrams</li>
          <li>Private messaging</li>
          <li>Multiple Channels Per Team</li>
          <li>More powerful diagraming tools</li>
        </ul>
      </div>
    );
  }
}

export default PremiumContainer;

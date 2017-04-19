import '../stylesheets/app.css';
import React from 'react';
import ReactDOM from 'react-dom';

////////////////////////////////////////////////
// testing to make sure React be work work
class Joust extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Drop your joust!
      </div>
    );
  }
}
/////////////////////////////////////////////////

const init = () => {
  ReactDOM.render(
      <Joust />,
      document.querySelector('#app')
    );
};

window.addEventListener('load', init);

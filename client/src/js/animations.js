

let loginControls;
let joinButton;
let heroText;
let heroImg;


const toggleLoginControls = (callback) => {
  TweenMax.to(loginControls, 0.3, { right: '-400px', onComplete: () => {
    callback();
    TweenMax.to(loginControls, 0.3, { delay: 0.3, right: '75px' });
  }});

  TweenMax.to(heroText, 0.3, { opacity: 0, onComplete: () => {
    TweenMax.to(heroText, 0.3, { delay: 0.3, opacity: 1 });
  }});
};

const init = () => {
  loginControls = document.querySelector('#login-controls');
  joinButton = document.querySelector('#join-button');
  heroText = document.querySelector('#hero-container').childNodes[0];
  heroImg = document.querySelector('#hero-img');
};

module.exports.init = init;
module.exports.toggleLoginControls = toggleLoginControls;

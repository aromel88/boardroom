
let premiumIsVisible;

const animateWithRewind = (element, duration, toOptions, backOptions, callback) => {
  TweenMax.to(element, duration, { ...toOptions, onComplete: () => {
    if (callback) callback();
    TweenMax.to(element, duration, backOptions);
  }});
};

const handleError = () => {
  TweenMax.to('.error', 0.1, {top: "-=10px", yoyo: true, repeat: 3});
};

const togglePremiumContainer = () => {
  premiumIsVisible = !premiumIsVisible;
  if (premiumIsVisible) {
    TweenMax.to('#premium-container', 0.2, { top: '0px' });
  } else {
    TweenMax.to('#premium-container', 0.2, { top: '100%' });
  }
};

const init = () => {
  premiumIsVisible = false;
};

module.exports.init = init;
module.exports.animateWithRewind = animateWithRewind;
module.exports.handleError = handleError;
module.exports.togglePremiumContainer = togglePremiumContainer;



const animateWithRewind = (element, duration, toOptions, backOptions, callback) => {
  TweenMax.to(element, duration, { ...toOptions, onComplete: () => {
    if (callback) callback();
    TweenMax.to(element, duration, backOptions);
  }});
};

const handleError = () => {
  TweenMax.to('.error', 0.1, {top: "-=10px", yoyo: true, repeat: 3});
};

module.exports.animateWithRewind = animateWithRewind;
module.exports.handleError = handleError;

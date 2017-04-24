

const animateWithRewind = (element, duration, toOptions, backOptions, callback) => {
  TweenMax.to(element, duration, { ...toOptions, onComplete: () => {
    if (callback) callback();
    TweenMax.to(element, duration, backOptions);
  }});
};

module.exports.animateWithRewind = animateWithRewind;

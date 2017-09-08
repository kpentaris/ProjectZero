/**
 * author: kpentaris
 * date: 24-Apr-17
 */

export let requestAnimationFrameShim: (loop: () => void) => void = (function() {
  return (window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    // window.mozRequestAnimationFrame ||
    // window.oRequestAnimationFrame ||
    // window.msRequestAnimationFrame ||
    requestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }).bind(window);
})();
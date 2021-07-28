/*
* Fix for :active.
*/
export default () => {
  document.addEventListener('touchstart', () => {}, false);
};

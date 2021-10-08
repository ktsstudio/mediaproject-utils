import noop from './noop';
/*
 * Fix for :active.
 */
export default (): void => {
  document.addEventListener('touchstart', noop, false);
};

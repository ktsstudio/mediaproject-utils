import noop from './noop';

/**
 * Фикс для :active.
 */
export default (): void => {
  document.addEventListener('touchstart', noop, false);
};

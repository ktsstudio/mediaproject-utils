import noop from './noop';

/**
 * Фикс для :active для safari.
 */
export default (): void => {
  document.addEventListener('touchstart', noop, false);
};

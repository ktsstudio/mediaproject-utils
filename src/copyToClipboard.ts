import noop from './noop';

/**
 * Wrapper for window.navigator.clipboard.writeText.
 * @param {string} text Text to copy
 * @param {VoidFunction} onSuccess Success callback
 * @param {VoidFunction} onError Error callback
 */
export default (
  text: string,
  onSuccess: VoidFunction,
  onError = noop
): void => {
  window.navigator.clipboard.writeText(text).then(onSuccess).catch(onError);
};

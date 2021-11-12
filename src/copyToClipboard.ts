import noop from './noop';

/**
 * Утилита для копирования текста в буфер обмена.
 * @param {string} text Текст, который надо скопировать.
 * @param {VoidFunction} onSuccess Колбэк, вызываемый в результате успеха.
 * @param {VoidFunction} onError Колбэк, вызываемый в случае ошибки.
 */
export default (
  text: string,
  onSuccess: VoidFunction,
  onError = noop
): void => {
  window.navigator.clipboard.writeText(text).then(onSuccess).catch(onError);
};

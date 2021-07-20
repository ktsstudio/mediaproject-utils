import noop from './noop';

export default (
  text: string,
  onSuccess: VoidFunction,
  onError = noop
): void => {
  window.navigator.clipboard.writeText(text).then(onSuccess).catch(onError);
};

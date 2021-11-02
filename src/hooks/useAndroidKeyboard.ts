import * as React from 'react';

/**
 * Tracks keyboard presence on android device.
 * @param {boolean} isAndroid
 * @param {VoidFunction} onAppear
 * @param {VoidFunction} onDisappear
 */
export default (
  isAndroid: boolean,
  onAppear: VoidFunction,
  onDisappear: VoidFunction
): void => {
  const [deviceHeight] = React.useState(window.innerHeight);

  const listener = () => {
    if (window.innerHeight / deviceHeight < 0.8) {
      onAppear();
    } else {
      onDisappear();
    }
  };

  React.useEffect(() => {
    if (isAndroid) {
      window.addEventListener('resize', listener);
    }

    return () => {
      if (isAndroid) {
        window.removeEventListener('resize', listener);
      }
    };
  }, []);
};

import * as React from 'react';

const getIsLandscape = () => window.innerWidth > window.innerHeight;

/**
 * Tracks screen orientation change on mobile device.
 * @param {boolean} isMobile
 * @returns {boolean} Result of checking if orientation is landscape.
 */
export default (isMobile: boolean): boolean => {
  const [isLandscape, setIsLandscape] = React.useState(
    isMobile ? getIsLandscape() : false
  );

  const onOrientationChange = () => {
    if (getIsLandscape()) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  };

  React.useEffect(() => {
    if (isMobile) {
      window.addEventListener('resize', onOrientationChange);
    }

    return () => {
      if (isMobile) {
        window.removeEventListener('resize', onOrientationChange);
      }
    };
  }, []);

  return isLandscape;
};

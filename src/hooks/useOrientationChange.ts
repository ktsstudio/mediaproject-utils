import * as React from 'react';

const getIsLandscape = (): boolean => window.innerWidth > window.innerHeight;

/**
 * Отслеживает текущую ориентацию мобильного устройства.
 * @param {boolean} isMobile
 * @returns {boolean} Результат проверки того, является ли текущая ориентация альбомной.
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

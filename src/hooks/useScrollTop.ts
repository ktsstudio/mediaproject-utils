import * as React from 'react';

/**
 * Осуществляет прокрутку страницы на верх.
 * @param {Array<any>} dependencies
 */
const useScrollTop = (dependencies = []) => {
  React.useEffect(() => {
    try {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }, dependencies);
};

export default useScrollTop;

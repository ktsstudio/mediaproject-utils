import * as React from 'react';

/**
 * Осуществляет прокрутку страницы на верх.
 * @param {Array<any>} dependencies
 * @param {boolean} condition
 */
const useScrollTop = (dependencies = [], condition = true) => {
  React.useEffect(() => {
    if (condition) {
      try {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      } catch (error) {
        window.scrollTo(0, 0);
      }
    }
  }, [...dependencies, condition]);
};

export default useScrollTop;

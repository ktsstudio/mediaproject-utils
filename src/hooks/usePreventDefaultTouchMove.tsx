import * as React from 'react';

/**
 * Предотвращает стандартное поведение браузера при скролле на мобильных устройствах.
 */
export const usePreventDefaultTouchMove =
  (): React.RefObject<HTMLDivElement> => {
    const refContainer = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const container = refContainer.current;

      if (!container) {
        return;
      }

      const preventDefaultTouchMove = (e: TouchEvent) => {
        e.stopPropagation();
        e.preventDefault();
      };

      const eventOptions = {
        capture: true,
        passive: false,
      };

      container.addEventListener(
        'touchmove',
        preventDefaultTouchMove,
        eventOptions
      );

      return () => {
        container.removeEventListener(
          'touchmove',
          preventDefaultTouchMove,
          eventOptions
        );
      };
    }, []);

    return refContainer;
  };

export default usePreventDefaultTouchMove;

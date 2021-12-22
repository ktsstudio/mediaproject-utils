import * as React from 'react';

/**
 * Вызывает переданную функцию с указанной частотой.
 * @param callback Функция, которую нужно вызывать
 * @param condition Условие, при котором нужно вызывать функцию. По умолчанию она вызывается всегда
 * @param pollingInterval Промежуток времени между вызовами в миллисекундах. По умолчанию минута
 */
export default (
  callback: VoidFunction,
  condition = true,
  pollingInterval = 60000
): void => {
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const stopPolling = React.useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const startPolling = React.useCallback(() => {
    stopPolling();
    callback();

    timer.current = setInterval(callback, pollingInterval);
  }, []);

  React.useEffect(() => {
    if (condition) {
      startPolling();
    }

    return () => stopPolling();
  }, [condition]);
};

import * as React from 'react';

/**
 * Возвращает измененное значение переменной с задержкой либо первоначальное, если изменений еще не было.
 * @template T
 * @param {T} value Переменная, изменение которой нужно отслеживать
 * @param {number} transitionTime Задержка в миллисекундах
 * @return {T} Значение переменной, изменяемое с задержкой
 */
export default <T>(value: T, transitionTime: number): T => {
  const timeout = React.useRef<NodeJS.Timeout>();
  const [localValue, setLocalValue] = React.useState<T>(value);

  React.useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => setLocalValue(value), transitionTime);
  }, [value]);

  React.useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return localValue;
};

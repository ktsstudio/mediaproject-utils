import * as React from 'react';

/**
 * Возвращает предыдущее значение переменной либо дефолтное, если изменений не было.
 * @template T
 * @param {T} state Переменная, изменение которой нужно отслеживать
 * @param {T} defaultState Дефолтное значение переменной
 * @return {T} Предыдущее значение переменной
 */
export default <T>(state: T, defaultState: T): T => {
  const prevState = React.useRef<T>(defaultState);

  React.useEffect(() => {
    return () => {
      prevState.current = state;
    };
  }, [state]);

  return prevState.current;
};

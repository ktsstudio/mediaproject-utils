import { LocalStorage } from './types/localStorage';

/**
 * Обертка над Local Storage, хранящаяся в Window.
 * @returns {LocalStorage} Текущее состояние хранилища.
 */
function getLocalStorage(): LocalStorage {
  window.__localstorage__ = {};

  return {
    setItem: (key, value) => {
      window.__localstorage__[key] = value;
    },
    getItem: (key) => window.__localstorage__[key],
    removeItem: (key) => {
      delete window.__localstorage__[key];
    },
  };
}

export default getLocalStorage();

import { LocalStorage } from './types/localStorage';

/*
 * Wrapper for Local Storage created in Window.
 * @returns {LocalStorage} Instance of created storage.
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

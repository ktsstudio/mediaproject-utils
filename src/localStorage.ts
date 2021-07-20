export interface LocalStorage {
  setItem: (key: string, value: unknown) => void;
  getItem: (key: string) => unknown;
  removeItem: (key: string) => void;
}

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

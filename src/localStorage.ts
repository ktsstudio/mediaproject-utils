import logError from './utils/logError';

interface ILocalStorage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  removeItem: (key: string) => void;
}

/**
 * Обертка над Local Storage, позволяющая взаимодействовать с
 * __localStorage__ в Window и обычным localStorage.
 * @returns {LocalStorage} Текущее состояние хранилища.
 */
class LocalStorage implements ILocalStorage {
  constructor() {
    window.__localStorage__ = {};
  }

  private _parser = (value: any): any => {
    try {
      return JSON.parse(value);
    } catch (error) {
      logError('could not parse value from localStorage', error);
    }

    return value;
  };

  setItem = (key: string, value: any): void => {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.__localStorage__[key] = value;
  };

  getItem = (key: string): any => {
    const valueFromLS = this._parser(window.localStorage.getItem(key));
    const valueFromWindow = window.__localStorage__[key];

    return valueFromLS || valueFromWindow;
  };

  removeItem = (key: string) => {
    window.localStorage.removeItem(key);
    delete window.__localStorage__[key];
  };
}

const localStorage = new LocalStorage();
export default localStorage;

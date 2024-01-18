import { LocalStorage } from './localStorage';

export interface WindowType {
  __localstorage__: Partial<LocalStorage>;
}

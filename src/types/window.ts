import { LocalStorage } from './localStorage';

export interface WindowType {
  __localstorage__: Partial<LocalStorage>;

  search: string;
  location_hash: string;

  is_production: boolean;
  is_dev: boolean;

  is_mobile: boolean;
  is_ios: boolean;

  user_id: number | null;
  app_id: number;
}

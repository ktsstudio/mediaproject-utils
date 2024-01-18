export interface LocalStorage {
  setItem: (key: string, value: unknown) => void;
  getItem: (key: string) => unknown;
  removeItem: (key: string) => void;
  [x: string]: unknown;
}

import { WindowType } from '../src';

declare global {
  // eslint-disable-next-line
  interface Window extends WindowType {
    __localStorage__: Record<string, any>;
  }
}

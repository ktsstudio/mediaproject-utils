import { act } from 'react-dom/test-utils';
import { isNumber } from './isNumber';
export enum WindowSizeEnum {
  big = 1200,
  small = 300,
}

type Size = {
  width: number;
  height: number;
};

export const windowKind = {
  wide: { width: WindowSizeEnum.big, height: WindowSizeEnum.small },
  narrow: { width: WindowSizeEnum.small, height: WindowSizeEnum.big },
  square: { width: WindowSizeEnum.big, height: WindowSizeEnum.big },
} as const;

export const setWindowSize = ({ width, height }: Partial<Size>): void => {
  isNumber(width) && (window.innerWidth = width);
  isNumber(height) && (window.innerHeight = height);
};

export const expectWindowSize = ({ width, height }: Partial<Size>): void => {
  isNumber(width) && expect(window.innerWidth).toEqual(width);
  isNumber(height) && expect(window.innerHeight).toEqual(height);
};

export const fireResize = (size: Partial<Size>): void => {
  setWindowSize(size);
  act(() => window.dispatchEvent(new Event('resize')));
};

export const mockWindowEventHooks = (): {
  addEventListenerMock: jest.SpyInstance;
  removeEventListenerMock: jest.SpyInstance;
} => ({
  addEventListenerMock: jest
    .spyOn(window, 'addEventListener')
    .mockImplementation(),
  removeEventListenerMock: jest
    .spyOn(window, 'removeEventListener')
    .mockImplementation(),
});

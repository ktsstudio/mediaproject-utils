import { act } from 'react-dom/test-utils';

export enum WindowSizeEnum {
  big = 1200,
  small = 300,
}

export type WindowSize = {
  width: WindowSizeEnum;
  height: WindowSizeEnum;
};

export const windowKind = {
  wide: { width: WindowSizeEnum.big, height: WindowSizeEnum.small },
  narrow: { width: WindowSizeEnum.small, height: WindowSizeEnum.big },
  square: { width: WindowSizeEnum.big, height: WindowSizeEnum.big },
} as const;

export const setWindowSize = ({ width, height }: WindowSize): void => {
  window.innerWidth = width;
  window.innerHeight = height;
};

export const expectWindowSize = ({ width, height }: WindowSize): void => {
  expect(window.innerWidth).toEqual(width);
  expect(window.innerHeight).toEqual(height);
};

export const fireResize = (size: WindowSize): void => {
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

import { renderHook, act } from '@testing-library/react';

import useOrientationChange from './useOrientationChange';

enum SizeEnum {
  big = 1200,
  small = 300,
}

type Size = {
  width: SizeEnum;
  height: SizeEnum;
};

const screenSize = {
  wide: { width: SizeEnum.big, height: SizeEnum.small },
  narrow: { width: SizeEnum.small, height: SizeEnum.big },
  square: { width: SizeEnum.big, height: SizeEnum.big },
} as const;

const setWindowSize = ({ width, height }: Size) => {
  window.innerWidth = width;
  window.innerHeight = height;
};

const expectWindowSize = ({ width, height }: Size) => {
  expect(window.innerWidth).toEqual(width);
  expect(window.innerHeight).toEqual(height);
};

const fireResize = (size: Size) => {
  setWindowSize(size);
  act(() => window.dispatchEvent(new Event('resize')));
};

const mockWindowEventHooks = () => ({
  addEventListenerMock: jest
    .spyOn(window, 'addEventListener')
    .mockImplementation(),
  removeEventListenerMock: jest
    .spyOn(window, 'removeEventListener')
    .mockImplementation(),
});

beforeEach(() => {
  setWindowSize(screenSize.wide);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Тест хука useOrientationChange:', () => {
  describe('С параметром isMobile == true:', () => {
    test('должен возвращать true для широкого экрана', () => {
      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(screenSize.wide);
      expect(result.current).toEqual(true);
    });

    test('должен возвращать false для узкого экрана', () => {
      setWindowSize(screenSize.narrow);

      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(screenSize.narrow);
      expect(result.current).toEqual(false);
    });

    test('должен возвращать false для квадратного экрана', () => {
      setWindowSize(screenSize.square);

      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(screenSize.square);
      expect(result.current).toEqual(false);
    });

    test('должен устанавливать и удалять обработчик на изменение размера окна', () => {
      const { addEventListenerMock, removeEventListenerMock } =
        mockWindowEventHooks();

      const { rerender, unmount } = renderHook(() =>
        useOrientationChange(true)
      );

      rerender();

      unmount();

      expect(addEventListenerMock).toBeCalledTimes(1);
      expect(removeEventListenerMock).toBeCalledTimes(1);
    });

    test('должен реагировать на изменение размера окна', () => {
      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(screenSize.wide);
      expect(result.current).toEqual(true);

      fireResize(screenSize.narrow);
      expectWindowSize(screenSize.narrow);
      expect(result.current).toEqual(false);

      fireResize(screenSize.wide);
      expectWindowSize(screenSize.wide);
      expect(result.current).toEqual(true);
    });
  });

  describe('С параметром isMobile == false:', () => {
    test('должен возвращать false для широкого экрана', () => {
      const { result } = renderHook(() => useOrientationChange(false));

      expectWindowSize(screenSize.wide);
      expect(result.current).toEqual(false);
    });

    test('должен возвращать false для узкого экрана', () => {
      setWindowSize(screenSize.narrow);

      const { result } = renderHook(() => useOrientationChange(false));

      expectWindowSize(screenSize.narrow);
      expect(result.current).toEqual(false);
    });

    test('должен возвращать false для квадратного экрана', () => {
      setWindowSize(screenSize.square);

      const { result } = renderHook(() => useOrientationChange(false));

      expectWindowSize(screenSize.square);
      expect(result.current).toEqual(false);
    });

    test('не должен устанавливать и удалять обработчик на изменение размера окна', () => {
      const { addEventListenerMock, removeEventListenerMock } =
        mockWindowEventHooks();

      const { rerender, unmount } = renderHook(() =>
        useOrientationChange(false)
      );

      rerender();

      unmount();

      expect(addEventListenerMock).not.toBeCalled();
      expect(removeEventListenerMock).not.toBeCalled();
    });
  });
});

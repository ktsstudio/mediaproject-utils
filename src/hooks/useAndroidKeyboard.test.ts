/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';
import { noop } from 'lodash';

import {
  WindowSizeEnum,
  expectWindowSize,
  fireResize,
  mockWindowEventHooks,
  setWindowSize,
} from '__tests__/utils/window';

import useAndroidKeyboard from './useAndroidKeyboard';

const KEYBOARD_HEIGHT_IN_PERCENT = 21;

const subtractHeightFraction = (height: number, percent: number) => {
  const fraction = percent / 100;
  return height * (1 - fraction);
};

beforeEach(() => {
  setWindowSize({ height: WindowSizeEnum.big });
});

afterEach(() => {
  jest.restoreAllMocks();
});

export const mockCallbacks = (): {
  onAppearMock: jest.Mock<VoidFunction>;
  onDisappearMock: jest.Mock<VoidFunction>;
} => ({
  onAppearMock: jest.fn(),
  onDisappearMock: jest.fn(),
});

describe('Тест хука useAndroidKeyboard:', () => {
  describe('С параметром isAndroid == true:', () => {
    test('должен устанавливать и удалять обработчик на изменение размера окна', () => {
      const { addEventListenerMock, removeEventListenerMock } =
        mockWindowEventHooks();

      const { rerender, unmount } = renderHook(() =>
        useAndroidKeyboard(true, noop, noop)
      );

      expect(addEventListenerMock).toBeCalledTimes(1);
      expect(addEventListenerMock.mock.lastCall?.[0]).toBe('resize');
      expect(removeEventListenerMock).not.toBeCalled();

      addEventListenerMock.mockReset();

      rerender();

      expect(addEventListenerMock).not.toBeCalled();
      expect(removeEventListenerMock).not.toBeCalled();

      unmount();

      expect(addEventListenerMock).not.toBeCalled();
      expect(removeEventListenerMock).toBeCalledTimes(1);
      expect(removeEventListenerMock.mock.lastCall?.[0]).toBe('resize');
    });

    test(`должен вызывать onAppear при уменьшении высоты окна на более чем на ${KEYBOARD_HEIGHT_IN_PERCENT}%`, () => {
      const { onAppearMock, onDisappearMock } = mockCallbacks();

      renderHook(() => useAndroidKeyboard(true, onAppearMock, onDisappearMock));

      let height = WindowSizeEnum.big;

      expectWindowSize({ height });
      expect(onAppearMock).not.toBeCalled();
      expect(onDisappearMock).not.toBeCalled();

      height = subtractHeightFraction(height, KEYBOARD_HEIGHT_IN_PERCENT);

      fireResize({ height });
      expectWindowSize({ height });
      expect(onAppearMock).toBeCalledTimes(1);
      expect(onDisappearMock).not.toBeCalled();

      height = WindowSizeEnum.big;
      onAppearMock.mockReset();

      fireResize({ height });
      expectWindowSize({ height });
      expect(onAppearMock).not.toBeCalled();
      expect(onDisappearMock).toBeCalledTimes(1);
    });

    test(`не должен вызывать onAppear при уменьшении высоты окна менее чем на ${KEYBOARD_HEIGHT_IN_PERCENT}%`, () => {
      const { onAppearMock, onDisappearMock } = mockCallbacks();

      renderHook(() => useAndroidKeyboard(true, onAppearMock, onDisappearMock));

      let height = WindowSizeEnum.big;

      expectWindowSize({ height });
      expect(onAppearMock).not.toBeCalled();
      expect(onDisappearMock).not.toBeCalled();

      height = subtractHeightFraction(height, KEYBOARD_HEIGHT_IN_PERCENT - 1);
      onDisappearMock.mockReset();

      fireResize({ height });
      expectWindowSize({ height });
      expect(onAppearMock).not.toBeCalled();
      expect(onDisappearMock).toBeCalledTimes(1);

      height = WindowSizeEnum.big;
      onDisappearMock.mockReset();

      fireResize({ height });
      expectWindowSize({ height });
      expect(onAppearMock).not.toBeCalled();
      expect(onDisappearMock).toBeCalledTimes(1);
    });
  });

  describe('С параметром isAndroid == false:', () => {
    test('не должен устанавливать и удалять обработчик на изменение размера окна', () => {
      const { addEventListenerMock, removeEventListenerMock } =
        mockWindowEventHooks();

      const { rerender, unmount } = renderHook(() =>
        useAndroidKeyboard(false, noop, noop)
      );

      rerender();

      unmount();

      expect(addEventListenerMock).not.toBeCalled();
      expect(removeEventListenerMock).not.toBeCalled();
    });
  });
});

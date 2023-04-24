/**
 * @jest-environment jsdom
 */

import { renderHook } from '@testing-library/react';

import {
  expectWindowSize,
  fireResize,
  mockWindowEventHooks,
  setWindowSize,
  windowKind,
} from '__tests__/utils/window';

import useOrientationChange from './useOrientationChange';

beforeEach(() => {
  setWindowSize(windowKind.wide);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Тест хука useOrientationChange:', () => {
  describe('С параметром isMobile == true:', () => {
    test('должен возвращать true для широкого экрана', () => {
      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(windowKind.wide);
      expect(result.current).toEqual(true);
    });

    test('должен возвращать false для узкого экрана', () => {
      setWindowSize(windowKind.narrow);

      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(windowKind.narrow);
      expect(result.current).toEqual(false);
    });

    test('должен возвращать false для квадратного экрана', () => {
      setWindowSize(windowKind.square);

      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(windowKind.square);
      expect(result.current).toEqual(false);
    });

    test('должен устанавливать и удалять обработчик на изменение размера окна', () => {
      const { addEventListenerMock, removeEventListenerMock } =
        mockWindowEventHooks();

      const { rerender, unmount } = renderHook(() =>
        useOrientationChange(true)
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

    test('должен реагировать на изменение размера окна', () => {
      const { result } = renderHook(() => useOrientationChange(true));

      expectWindowSize(windowKind.wide);
      expect(result.current).toEqual(true);

      fireResize(windowKind.narrow);
      expectWindowSize(windowKind.narrow);
      expect(result.current).toEqual(false);

      fireResize(windowKind.wide);
      expectWindowSize(windowKind.wide);
      expect(result.current).toEqual(true);
    });
  });

  describe('С параметром isMobile == false:', () => {
    test('должен возвращать false для широкого экрана', () => {
      const { result } = renderHook(() => useOrientationChange(false));

      expectWindowSize(windowKind.wide);
      expect(result.current).toEqual(false);
    });

    test('должен возвращать false для узкого экрана', () => {
      setWindowSize(windowKind.narrow);

      const { result } = renderHook(() => useOrientationChange(false));

      expectWindowSize(windowKind.narrow);
      expect(result.current).toEqual(false);
    });

    test('должен возвращать false для квадратного экрана', () => {
      setWindowSize(windowKind.square);

      const { result } = renderHook(() => useOrientationChange(false));

      expectWindowSize(windowKind.square);
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

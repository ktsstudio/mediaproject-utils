import noop from './noop';

/**
 * Функция для загрузки изображения через image.onload через промис
 * @param {string} src image.src
 * @param {VoidFunction} onLoaded Колбэк на успешную загрузку изображения
 */
export const loadImage = async (
  src: string,
  onLoaded: VoidFunction
): Promise<void> =>
  new Promise<void>((resolve) => {
    const curImage = new Image();
    curImage.src = src;
    curImage.onload = () => {
      onLoaded();
      resolve();
    };
    curImage.onerror = () => resolve();
  });

/**
 * Утилита для асинхронной загрузки изображений
 * @param {string[]} images Массив image.src
 * @param {VoidFunction} onNextLoaded Колбэк, который вызывается после успешной загрузки каждого изображения
 */
export default async (
  images: string[],
  onNextLoaded: VoidFunction = noop
): Promise<void> => {
  await Promise.all(images.map((i) => loadImage(i, onNextLoaded)));
};

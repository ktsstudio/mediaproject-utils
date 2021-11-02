import noop from './noop';

/**
 * Async wrapper for image.onload.
 * @param {string} src Image src
 * @param {VoidFunction} onLoaded Callback on image success load end
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
 * Method for async load of multiple images
 * @param {string[]} images Images src array
 * @param {VoidFunction} onNextLoaded Callback on every image success load end
 */
export default async (
  images: string[],
  onNextLoaded: VoidFunction = noop
): Promise<void> => {
  await Promise.all(images.map((i) => loadImage(i, onNextLoaded)));
};

export const loadImage = async (
  src: string,
  onLoaded: () => void
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

export default async (
  images: Array<string>,
  onNextLoaded = () => null
): Promise<void> => {
  await Promise.all(images.map((i) => loadImage(i, onNextLoaded)));
};

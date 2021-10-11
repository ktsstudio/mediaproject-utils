import { MarkupConst, MarkupType } from './types/markup';
import checkMobile from './checkMobile';

const defaultMarkupConst = {
  width: 1280,
  height: 820,
  mobileWidth: 375,
  mobileHeight: 667,
  initScale: 10,
  maxAspect: 1,
  minAspect: 1,
  maxFontSize: null,
};

const markup: (
  withCheckMobile?: boolean,
  markupConst?: MarkupConst
) => MarkupType = (
  withCheckMobile = true,
  markupConst = defaultMarkupConst
) => ({
  const: markupConst,
  initResize: false,
  currentFontSize: null,
  withCheckMobile,

  init: function init(maxFontSize?: number): void {
    if (maxFontSize !== undefined) {
      this.const.maxFontSize = maxFontSize;
    }

    this.fit();
    window.addEventListener('resize', this.fit.bind(this));
    window.onresize = () => {
      if (!this.initResize) {
        this.initResize = true;
        this.fit();
      }
    };
  },

  fit: function fit(): void {
    const currentHeight = window.innerHeight;
    const currentWidth = window.innerWidth;

    if (this.withCheckMobile) {
      this.checkMobile();
    }

    const width = window.is_mobile ? this.const.mobileWidth : this.const.width;
    const height = window.is_mobile
      ? this.const.mobileHeight
      : this.const.height;

    let scaleX = currentWidth / width;
    let scaleY = currentHeight / height;

    if (scaleX * height > currentHeight) {
      scaleX = currentHeight / height;
    }

    if (scaleY * width > currentWidth) {
      scaleY = currentWidth / width;
    }

    let currentScale = Math.min(scaleX, scaleY);
    if (currentHeight > currentWidth * 2) {
      currentScale +=
        0.1 * (currentHeight / (currentWidth * 2 + currentHeight));
    }

    const result = currentScale * this.const.initScale;

    this.currentFontSize = this.round(result);
    if (
      this.const.maxFontSize !== null &&
      this.currentFontSize > this.const.maxFontSize
    ) {
      this.currentFontSize = this.const.maxFontSize;
    }

    document.documentElement.style.fontSize = `${this.currentFontSize}px`;
  },

  round: function round(value: number): number {
    return Math.round(value * 2) / 2;
  },

  checkMobile,
});

export default markup;

export interface MarkupConst {
  width: number;
  height: number;
  mobileWidth: number;
  mobileHeight: number;
  initScale: number;
  maxAspect: number;
  minAspect: number;
  maxFontSize: number | null;
}

export interface MarkupType {
  const: MarkupConst;
  initResize: boolean;
  currentFontSize: number | null;
  init: (maxFontSize?: number) => void;
  fit: VoidFunction;
  round: (value: number) => number;
  checkMobile: VoidFunction;
}

import loadImages from './loadImages';
import pluralize, { plural } from './pluralize';
import findGetParameter from './findGetParameter';
import noop from './noop';
import get from './getter';
import localStorage from './localStorage';
import checkDev from './checkDev';
import checkMobile from './checkMobile';
import api, { callApi } from './api';
import randomNumber from './randomNumber';
import copyToClipboard from './copyToClipboard';
import fixActive from './fixActive';
import splitIntoLines from './splitIntoLines';
import sleep from './sleep';
import { ApiResponse, UrlConfigType } from './types/api';
import { LocalStorage } from './types/localStorage';
import { PluralizeWordsType } from './types/pluralize';
import { WindowType } from './types/window';
import {
  useAndroidKeyboard,
  useOrientationChange,
  useScrollTop,
  useValueTransition,
  usePreviousState,
  usePolling,
  OrientationProvider,
  useOrientationContext,
} from './hooks';

export {
  loadImages,
  pluralize,
  plural,
  findGetParameter,
  noop,
  get,
  localStorage,
  checkDev,
  checkMobile,
  api,
  callApi,
  randomNumber,
  copyToClipboard,
  fixActive,
  useAndroidKeyboard,
  useOrientationChange,
  useScrollTop,
  useValueTransition,
  usePreviousState,
  usePolling,
  OrientationProvider,
  useOrientationContext,
  splitIntoLines,
  sleep,
};

export {
  ApiResponse,
  UrlConfigType,
  LocalStorage,
  PluralizeWordsType,
  WindowType,
};

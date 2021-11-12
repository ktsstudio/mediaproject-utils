import loadImages from './loadImages';
import pluralize from './pluralize';
import findGetParameter from './findGetParameter';
import noop from './noop';
import get from './getter';
import localStorage from './localStorage';
import checkMobile from './checkMobile';
import api, { callApi } from './api';
import randomNumber from './randomNumber';
import copyToClipboard from './copyToClipboard';
import initializeAppParams from './initializeAppParams';
import fixActive from './fixActive';
import { ApiResponse } from './types/api';
import { LocalStorage } from './types/localStorage';
import { WindowType } from './types/window';

export {
  loadImages,
  pluralize,
  findGetParameter,
  noop,
  get,
  localStorage,
  checkMobile,
  api,
  callApi,
  randomNumber,
  copyToClipboard,
  initializeAppParams,
  fixActive,
};

export { ApiResponse, LocalStorage, WindowType };

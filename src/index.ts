import loadImages from './loadImages';
import pluralize from './pluralize';
import findGetParameter from './findGetParameter';
import noop from './noop';
import get from './getter';
import localStorage from './localStorage';
import checkMobile from './checkMobile';
import api, { callApi } from './api';
import markup from './markup';
import randomNumber from './randomNumber';
import copyToClipboard from './copyToClipboard';
import initializeAppParams from './initializeAppParams';
import fixActive from './fixActive';

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
  markup,
  randomNumber,
  copyToClipboard,
  initializeAppParams,
  fixActive,
};

import { ApiResponse } from './types/api';
import { LocalStorage } from './types/localStorage';
import { MakrupConst, MarkupType } from './types/markup';
import { WindowType } from './types/window';

export { ApiResponse, LocalStorage, MakrupConst, MarkupType, WindowType };

import loadImages from './loadImages';
import pluralize from './pluralize';
import findGetParameter from './findGetParameter';
import noop from './noop';
import get from './getter';
import localStorage, { LocalStorage } from './localStorage';
import checkMobile from './checkMobile';
import checkIOS from './checkIOS';
import api, { ApiResponse, callApi } from './api';
import markup, { MarkupType } from './markup';
import randomNumber from './randomNumber';
import copyToClipboard from './copyToClipboard';

export {
  loadImages,
  pluralize,
  findGetParameter,
  noop,
  get,
  localStorage,
  checkMobile,
  checkIOS,
  api,
  callApi,
  markup,
  randomNumber,
  copyToClipboard,
};

export { ApiResponse, LocalStorage, MarkupType };

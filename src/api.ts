import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import get from './getter';
import localStorage from './localStorage';
import { ApiResponse, UrlConfigType } from './types/api';

export function callApi(
  urlConfig: UrlConfigType,
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<any>> {
  return axios({
    ...urlConfig,
    ...config,
  }).then(
    (result: AxiosResponse<any>) => {
      if (result.status !== 200 && get(result, 'data.status') !== 'ok') {
        return Promise.reject(result);
      }

      if (get(result, 'data.status') === 'error') {
        return Promise.reject(result);
      }

      const response =
        get(result, 'data.data') || get(result, 'data') || result;

      if (response.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

/**
 * Метод для отправки запроса к api.
 * @param {UrlConfigType} urlConfig URL, на который нужно отправить запрос, вместе с методом запроса
 * @param {any} data Тело запроса либо GET-параметры в виде объекта
 * @param {AxiosRequestConfig} config Конфиг axios
 * @param {boolean} multipartFormData Содержит ли запрос данные формы
 * @param {boolean} withToken Для запросов с токеном из local storage
 * @returns {ApiResponse} Если статус ответа 200, возвращает поле response с ответом от сервера,
 * иначе поля error and errorData с информацией об ошибке.
 */
export default function api(
  urlConfig: UrlConfigType,
  data: null | undefined | any = {},
  config: AxiosRequestConfig = {},
  multipartFormData = false,
  withToken = true
): Promise<ApiResponse<any>> {
  const queryConfig = { ...config };

  if (
    (queryConfig.data === null || queryConfig.data === undefined) &&
    urlConfig.method !== 'GET'
  ) {
    queryConfig.data = data;
  }

  if (!queryConfig.headers) {
    queryConfig.headers = {};
  }

  if (multipartFormData) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    queryConfig.data = formData;

    Object.assign(queryConfig.headers, {
      'Content-Type': 'multipart/form-data',
    });
  }

  if (localStorage.getItem('token') && withToken) {
    Object.assign(queryConfig.headers, {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }

  if (urlConfig.method === 'GET') {
    queryConfig.params = {
      ...data,
      uid: localStorage.getItem('userId'),
    };
  } else {
    queryConfig.params = {
      uid: localStorage.getItem('userId'),
    };
  }

  return callApi(urlConfig, queryConfig)
    .then((response) => ({ response }))
    .catch((error) => {
      return {
        error,
        errorData: get(error, 'response.data') || {},
      };
    });
}

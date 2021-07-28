import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import get from './getter';
import localStorage from './localStorage';
import { ApiResponse } from './types/api';

export function callApi(
  url: string,
  method: Method = 'GET',
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<unknown>> {
  return axios({
    method,
    url,
    ...config,
  }).then(
    (result: AxiosResponse<unknown>) => {
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

/*
 * Method to send api request.
 * @param {string} endpoint URL to send request to
 * @param {Method} methodType Request method, default is 'GET'
 * @param {any} data Request payload
 * @param {AxiosRequestConfig} config Axios request config
 * @param {boolean} multipartFormData If request has FormData
 * @param {boolean} withToken For signed requests with token from local storage
 * @returns {ApiResponse} Contains data in field response, if status was 200,
 * otherwise contains error data in fields error and errorData.
 */
export default function api(
  endpoint: string,
  methodType: Method = 'GET',
  data: null | undefined | any = {},
  config: AxiosRequestConfig = {},
  multipartFormData = false,
  withToken = true
): Promise<ApiResponse<unknown>> {
  const queryConfig = { ...config };

  if (
    (queryConfig.data === null || queryConfig.data === undefined) &&
    methodType !== 'GET'
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

  const queryMethodType = methodType.toUpperCase() as Method;

  if (queryMethodType === 'GET') {
    queryConfig.params = {
      ...data,
      uid: localStorage.getItem('userId'),
    };
  } else {
    queryConfig.params = {
      uid: localStorage.getItem('userId'),
    };
  }

  return callApi(endpoint, queryMethodType, queryConfig)
    .then((response) => ({ response }))
    .catch((error) => {
      return {
        error,
        errorData: get(error, 'response.data') || {},
      };
    });
}

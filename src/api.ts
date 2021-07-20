import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import get from './getter';
import localStorage from './localStorage';

export type ApiResponse<T> = {
  response?: T;
  error?: unknown;
  errorData?: unknown;
};

export function callApi(
  url: string,
  method: Method = 'GET',
  config: AxiosRequestConfig = {}
): Promise<ApiResponse<any>> {
  return axios({
    method,
    url,
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

export default function api(
  endpoint: string,
  methodType: Method = 'GET',
  data: null | undefined | any = {},
  config: AxiosRequestConfig = {},
  multipartFormData = false,
  withToken = true
): Promise<ApiResponse<any>> {
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

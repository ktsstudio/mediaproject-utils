import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import localStorage from './localStorage';
import createMultipartFormData from './utils/createMultipartFormData';
import {
  EndpointType,
  RequestParamsType,
  ApiResponseType,
  ResponseType,
} from './types/api';

export function callApi<R = any, E = any>(
  endpoint: EndpointType,
  config: AxiosRequestConfig = {}
): Promise<AxiosResponse<ApiResponseType<R, E>>> {
  return axios({
    ...endpoint,
    ...config,
  });
}

/**
 * Метод для отправки запроса к api.
 * @param {EndpointType} endpoint Объект с информацией об эндпоинте - URL и метод
 * @param {Record<string, any>} data Тело запроса либо GET-параметры в виде объекта
 * @param {AxiosRequestConfig} config Конфиг axios
 * @param {boolean} withToken Для запросов с токеном из local storage
 * @param {boolean} withMultipartFormData Содержит ли запрос данные формы
 * @returns {ApiResponse} Если статус ответа 200, возвращает поле response с ответом от сервера,
 * иначе поля error and errorData с информацией об ошибке. Также возвращает флаг isError
 * обозначающий наличие ошибки
 */
export default async function api<R = any, E = any>({
  endpoint: { url, method = 'GET' },
  data = {},
  config = {},
  withToken = true,
  withMultipartFormData = false,
}: RequestParamsType): Promise<ResponseType<R, E>> {
  const requestConfig = { ...config };

  if (!requestConfig.headers) {
    requestConfig.headers = {};
  }

  if (withToken) {
    const token = localStorage.getItem('token');

    requestConfig.headers = {
      ...requestConfig.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (withMultipartFormData) {
    requestConfig.data = createMultipartFormData(data);

    requestConfig.headers = {
      ...requestConfig.headers,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'multipart/form-data',
    };
  }

  if (method.toUpperCase() === 'GET') {
    requestConfig.params = { ...data };
  } else {
    requestConfig.data = { ...data };
  }

  return callApi<R, E>(
    {
      url,
      method,
    },
    requestConfig
  )
    .then((response) => ({
      isError: response.data.status !== 'ok',
      response: response.data.data,
    }))
    .catch((error) => ({
      isError: true,
      error,
      errorData: error.response.data,
    }));
}

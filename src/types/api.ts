import { AxiosRequestConfig, Method } from 'axios';

export type EndpointType = {
  url: string;
  method?: Method;
};

export type ApiResponseErrorDataType<D = any> = {
  code: string;
  http_status: number;
  message: string;
  data: D;
};

export type ApiResponseType<R = any, E = ApiResponseErrorDataType<any>> = {
  status: 'ok' | 'error';
  data?: R | E;
};

export type RequestParamsType = {
  endpoint: EndpointType;
  data?: Record<string, any>;
  config?: AxiosRequestConfig;
  withToken?: boolean;
  withMultipartFormData?: boolean;
};

export type ResponseType<R = any, E = ApiResponseErrorDataType<any>> = {
  isError: boolean;
  response?: R | E;
  error?: any;
  errorData?: E;
};

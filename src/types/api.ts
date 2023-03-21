import { Method } from 'axios';

/**
 * Тип данных, возвращаемых в запросе к api.
 */
export type ApiResponse<R = any, E = any> = {
  response?: R;
  error?: unknown;
  errorData?: E;
};

export type UrlConfigType = {
  url: string;
  method?: Method;
};

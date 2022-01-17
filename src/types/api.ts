import { Method } from 'axios';

/**
 * Тип данных, возвращаемых в запросе к api.
 */
export type ApiResponse<T> = {
  response?: T;
  error?: unknown;
  errorData?: unknown;
};

export type UrlConfigType = {
  url: string;
  method?: Method;
};

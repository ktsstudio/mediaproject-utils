/*
* Type of data returned by api request.
*/
export type ApiResponse<T> = {
    response?: T;
    error?: unknown;
    errorData?: unknown;
};
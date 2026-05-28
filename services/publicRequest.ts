import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

import { API_BASE_URL, API_TIMEOUT } from '@/constants/api';
import { handleApiError } from '@/lib/toast';
import type { ApiError, ApiResponse } from '@/types/api.types';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      (error.response?.data as Record<string, string>)?.message ??
      error.message ??
      'An unexpected error occurred';

    const apiError: ApiError = {
      message,
      status: error.response?.status ?? 500,
      errors: (error.response?.data as Record<string, Record<string, string[]>>)?.errors,
    };

    if (typeof window !== 'undefined') handleApiError(message);

    return Promise.reject(apiError);
  }
);

export const publicRequest = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    client.get<ApiResponse<T>>(url, config).then((r) => r.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.post<ApiResponse<T>>(url, data, config).then((r) => r.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.put<ApiResponse<T>>(url, data, config).then((r) => r.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    client.patch<ApiResponse<T>>(url, data, config).then((r) => r.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    client.delete<ApiResponse<T>>(url, config).then((r) => r.data),
};

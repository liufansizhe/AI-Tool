// HTTP 请求封装 - 客户端使用
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import type { ApiResponse, ApiError } from '@/shared/types/api';
import { config } from '@/config';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: config.client.apiUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;

    // 业务错误处理
    if (data.code !== 200) {
      const error: ApiError = {
        code: data.code,
        message: data.message || '请求失败',
      };
      return Promise.reject(error);
    }

    return response;
  },
  (error: AxiosError<ApiError>) => {
    // HTTP 错误处理
    const apiError: ApiError = {
      code: error.response?.status || 500,
      message: error.response?.data?.message || '网络错误',
    };

    // 处理特定错误码
    if (apiError.code === 401) {
      // 未授权，清除 token 并跳转登录
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(apiError);
  }
);

// 封装 GET 请求
export function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return request.get<ApiResponse<T>>(url, config).then((res) => res.data.data);
}

// 封装 POST 请求
export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  return request
    .post<ApiResponse<T>>(url, data, config)
    .then((res) => res.data.data);
}

// 封装 PUT 请求
export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  return request
    .put<ApiResponse<T>>(url, data, config)
    .then((res) => res.data.data);
}

// 封装 DELETE 请求
export function del<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return request
    .delete<ApiResponse<T>>(url, config)
    .then((res) => res.data.data);
}

// 上传文件
export function upload<T = unknown>(
  url: string,
  file: File,
  config?: AxiosRequestConfig
): Promise<T> {
  const formData = new FormData();
  formData.append('file', file);

  return request
    .post<ApiResponse<T>>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers,
      },
    })
    .then((res) => res.data.data);
}

export default request;

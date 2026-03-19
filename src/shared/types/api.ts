// API 类型定义

export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

export interface ApiError {
  code: number;
  message: string;
  details?: Record<string, string[]>;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginationData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 用户相关
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

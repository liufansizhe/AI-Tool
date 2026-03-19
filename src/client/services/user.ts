// 用户相关 API
import { get, post, put, del } from './request';
import type { User, PaginationData } from '@/shared/types/api';

export interface UserListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

/**
 * 获取用户列表
 */
export function getUserList(params: UserListParams = {}): Promise<PaginationData<User>> {
  return get<PaginationData<User>>('/user/list', { params });
}

/**
 * 获取用户详情
 * @param id 用户ID
 */
export function getUserById(id: string): Promise<User> {
  return get<User>(`/user/${id}`);
}

/**
 * 创建用户
 */
export function createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  return post<User>('/user', data);
}

/**
 * 更新用户
 */
export function updateUser(id: string, data: Partial<User>): Promise<User> {
  return put<User>(`/user/${id}`, data);
}

/**
 * 删除用户
 */
export function deleteUser(id: string): Promise<void> {
  return del(`/user/${id}`);
}

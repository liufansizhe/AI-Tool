// 认证相关 API
import { get, post } from './request';
import { encryptLoginPassword } from '@/shared/utils/crypto';
import type { LoginParams, LoginResult, User } from '@/shared/types/api';

// 注册参数
export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

// 忘记密码参数
export interface ForgotPasswordParams {
  email: string;
}

// 重置密码参数
export interface ResetPasswordParams {
  token: string;
  password: string;
}

// 修改密码参数
export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

/**
 * 用户登录
 * @param params 登录参数
 */
export async function login(params: LoginParams): Promise<LoginResult> {
  // 前端加密密码后再发送
  const encryptedPassword = await encryptLoginPassword(params.password, params.username);

  return post<LoginResult>('/auth/login', {
    username: params.username,
    password: encryptedPassword,
  });
}

/**
 * 用户注册
 * @param params 注册参数
 */
export async function register(params: RegisterParams): Promise<LoginResult> {
  // 前端加密密码后再发送（使用用户名作为盐值）
  const encryptedPassword = await encryptLoginPassword(params.password, params.username);

  return post<LoginResult>('/auth/register', {
    username: params.username,
    email: params.email,
    password: encryptedPassword,
  });
}

/**
 * 忘记密码 - 发送重置邮件
 * @param params 忘记密码参数
 */
export function forgotPassword(params: ForgotPasswordParams): Promise<void> {
  return post('/auth/forgot-password', params);
}

/**
 * 重置密码
 * @param params 重置密码参数
 * @param username 用户名（用于加密盐值）
 */
export async function resetPassword(params: ResetPasswordParams, username: string): Promise<void> {
  // 前端加密密码后再发送（使用用户名作为盐值）
  const encryptedPassword = await encryptLoginPassword(params.password, username);

  return post('/auth/reset-password', {
    token: params.token,
    password: encryptedPassword,
  });
}

/**
 * 验证重置令牌是否有效
 * @param token 重置令牌
 */
export function validateResetToken(token: string): Promise<{ valid: boolean; username?: string }> {
  return get(`/auth/reset-password?token=${token}`);
}

/**
 * 修改密码（需要登录）
 * @param params 修改密码参数
 * @param username 用户名（用于加密盐值）
 */
export async function changePassword(params: ChangePasswordParams, username: string): Promise<void> {
  // 前端加密密码后再发送
  const encryptedOldPassword = await encryptLoginPassword(params.oldPassword, username);
  const encryptedNewPassword = await encryptLoginPassword(params.newPassword, username);

  return post('/auth/change-password', {
    oldPassword: encryptedOldPassword,
    newPassword: encryptedNewPassword,
  });
}

/**
 * 用户登出
 */
export function logout(): Promise<void> {
  return post('/auth/logout');
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): Promise<User> {
  return get<User>('/auth/user');
}

/**
 * 刷新 Token
 */
export function refreshToken(): Promise<{ token: string }> {
  return post('/auth/refresh');
}

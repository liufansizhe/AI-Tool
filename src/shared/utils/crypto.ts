/**
 * 密码加密工具
 * 提供前端密码加密功能，防止明文传输
 */

/**
 * SHA-256 哈希加密
 * @param message 待加密的字符串
 * @returns 加密后的哈希值（hex 格式）
 */
export async function sha256(message: string): Promise<string> {
  // 使用 Web Crypto API 进行 SHA-256 加密
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * 简单的盐值加密（用于增加安全性）
 * @param password 原始密码
 * @param salt 盐值（可以使用用户名或固定盐）
 * @returns 加盐后的哈希值
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const saltedPassword = `${salt}:${password}`;
  return sha256(saltedPassword);
}

/**
 * 登录密码加密
 * 对密码进行前端加密，然后再发送到服务端
 * @param password 原始密码
 * @param username 用户名（作为盐值）
 * @returns 加密后的密码
 */
export async function encryptLoginPassword(password: string, username: string): Promise<string> {
  // 使用用户名作为盐值，增加安全性
  return hashPassword(password, username);
}

/**
 * 通用密码加密（用于注册、重置密码等场景）
 * 不使用盐值，直接对密码进行 SHA-256 加密
 * @param password 原始密码
 * @returns 加密后的密码
 */
export async function encryptPassword(password: string): Promise<string> {
  return sha256(password);
}

/**
 * 生成随机盐值
 * @param length 盐值长度
 * @returns 随机盐值字符串
 */
export function generateSalt(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let salt = '';
  for (let i = 0; i < length; i++) {
    salt += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return salt;
}

/**
 * Base64 编码
 * @param str 原始字符串
 * @returns Base64 编码后的字符串
 */
export function base64Encode(str: string): string {
  if (typeof window !== 'undefined') {
    return window.btoa(str);
  }
  return Buffer.from(str).toString('base64');
}

/**
 * Base64 解码
 * @param str Base64 字符串
 * @returns 解码后的原始字符串
 */
export function base64Decode(str: string): string {
  if (typeof window !== 'undefined') {
    return window.atob(str);
  }
  return Buffer.from(str, 'base64').toString('utf-8');
}

import jwt from 'jsonwebtoken';
import { config } from '@/config/env';

export interface TokenPayload {
  userId: string;
  username: string;
  role: string;
}

const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRES_IN = config.jwt.expiresIn || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT 密钥未配置，请在 .env.local 文件中设置 JWT_SECRET 环境变量');
}

/**
 * 生成 JWT Token
 */
export function generateToken(payload: TokenPayload): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as any });
}

/**
 * 验证 JWT Token
 */
export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

/**
 * 解码 JWT Token（不验证）
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch {
    return null;
  }
}

import { NextRequest } from 'next/server';
import { verifyToken, type TokenPayload } from './jwt';

export function getTokenFromHeader(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

interface AuthSuccess {
  success: true;
  user: TokenPayload;
}

interface AuthFailure {
  success: false;
  error: string;
}

export function authenticateRequest(request: NextRequest): AuthSuccess | AuthFailure {
  const token = getTokenFromHeader(request);

  if (!token) {
    return { success: false, error: '未提供认证令牌' };
  }

  try {
    const decoded = verifyToken(token);
    return { success: true, user: decoded };
  } catch (error) {
    return { success: false, error: '令牌无效或已过期' };
  }
}

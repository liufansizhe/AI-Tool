import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/shared/types/api';

/**
 * 用户登出
 * POST /api/auth/logout
 */
export async function POST(request: NextRequest) {
  // 这里可以处理 token 失效逻辑
  const response: ApiResponse<null> = {
    code: 200,
    data: null,
    message: '登出成功',
  };

  return NextResponse.json(response);
}

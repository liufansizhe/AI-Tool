import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/server/db/mongodb';
import { User } from '@/models';
import { authenticateRequest } from '@/server/auth';
import type { ApiResponse, User as UserType } from '@/shared/types/api';

/**
 * 获取当前用户信息
 * GET /api/auth/user
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // 验证用户身份
    const auth = authenticateRequest(request);
    if (!auth.success) {
      const response: ApiResponse<null> = {
        code: 401,
        data: null,
        message: auth.error,
      };
      return NextResponse.json(response, { status: 401 });
    }

    // 查找用户
    const user = await User.findById(auth.user!.userId);

    if (!user) {
      const response: ApiResponse<null> = {
        code: 404,
        data: null,
        message: '用户不存在',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<UserType> = {
      code: 200,
      data: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
      message: '获取成功',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('获取用户信息错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

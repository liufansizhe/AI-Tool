import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/server/services';
import { generateToken } from '@/server/auth';
import type { ApiResponse, LoginParams, LoginResult } from '@/shared/types/api';

/**
 * 用户登录
 * POST /api/auth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body: LoginParams = await request.json();

    // 参数验证
    if (!body.username || !body.password) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '用户名和密码不能为空',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 查找用户（包含密码字段）
    const user = await userService.findWithPassword(body.username);

    if (!user) {
      const response: ApiResponse<null> = {
        code: 401,
        data: null,
        message: '用户名或密码错误',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // 验证密码
    // 前端已加密：sha256(username:password)
    // 数据库存储：bcrypt(sha256(username:originalPassword))
    const isPasswordValid = await user.comparePassword(body.password);

    if (!isPasswordValid) {
      const response: ApiResponse<null> = {
        code: 401,
        data: null,
        message: '用户名或密码错误',
      };
      return NextResponse.json(response, { status: 401 });
    }

    // 生成 JWT Token
    const token = generateToken({
      userId: user._id.toString(),
      username: user.username,
      role: user.role,
    });

    const result: LoginResult = {
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
      },
    };

    const response: ApiResponse<LoginResult> = {
      code: 200,
      data: result,
      message: '登录成功',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('登录错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

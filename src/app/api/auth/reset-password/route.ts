import { NextRequest, NextResponse } from 'next/server';
import { User, PasswordReset } from '@/models';
import type { ApiResponse } from '@/shared/types/api';

/**
 * 重置密码
 * POST /api/auth/reset-password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '请提供令牌和新密码',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 密码长度验证
    if (password.length < 6) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '密码至少6个字符',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 查找有效的重置记录
    const resetRecord = await PasswordReset.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '链接已过期或无效，请重新申请',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 查找用户
    const user = await User.findOne({ email: resetRecord.email });

    if (!user) {
      const response: ApiResponse<null> = {
        code: 404,
        data: null,
        message: '用户不存在',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 更新密码
    user.password = password;
    await user.save();

    // 标记重置记录为已使用
    resetRecord.used = true;
    await resetRecord.save();

    const response: ApiResponse<null> = {
      code: 200,
      data: null,
      message: '密码重置成功，请使用新密码登录',
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('重置密码错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * 验证重置令牌是否有效
 * GET /api/auth/reset-password?token=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '请提供令牌',
      };
      return NextResponse.json(response, { status: 400 });
    }

    const resetRecord = await PasswordReset.findOne({
      token,
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!resetRecord) {
      const response: ApiResponse<{ valid: boolean; username?: string }> = {
        code: 200,
        data: { valid: false },
        message: '令牌无效或已过期',
      };
      return NextResponse.json(response);
    }

    // 查找用户获取 username
    const user = await User.findOne({ email: resetRecord.email });

    const response: ApiResponse<{ valid: boolean; username?: string }> = {
      code: 200,
      data: {
        valid: true,
        username: user?.username,
      },
      message: '令牌有效',
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('验证令牌错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

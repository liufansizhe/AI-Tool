import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models';
import { authenticateRequest } from '@/server/auth';
import type { ApiResponse } from '@/shared/types/api';

/**
 * 修改密码（需要登录）
 * POST /api/auth/change-password
 */
export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json();
    const { oldPassword, newPassword } = body;

    // 参数验证
    if (!oldPassword || !newPassword) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '请输入旧密码和新密码',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 新密码长度验证
    if (newPassword.length < 6) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '新密码至少6个字符',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 查找用户（包含密码字段）
    const user = await User.findById(auth.user.userId).select('+password');

    if (!user) {
      const response: ApiResponse<null> = {
        code: 404,
        data: null,
        message: '用户不存在',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // 验证旧密码
    const isOldPasswordValid = await user.comparePassword(oldPassword);

    if (!isOldPasswordValid) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '旧密码错误',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 更新密码
    user.password = newPassword;
    await user.save();

    const response: ApiResponse<null> = {
      code: 200,
      data: null,
      message: '密码修改成功',
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('修改密码错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

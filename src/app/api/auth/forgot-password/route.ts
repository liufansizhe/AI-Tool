import { NextRequest, NextResponse } from 'next/server';
import { User, PasswordReset } from '@/models';
import { emailService } from '@/server/services/email-service';
import type { ApiResponse } from '@/shared/types/api';
import crypto from 'crypto';

/**
 * 忘记密码 - 发送重置邮件
 * POST /api/auth/forgot-password
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '请输入邮箱地址',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 查找用户
    const user = await User.findOne({ email });

    // 即使用户不存在也返回成功（安全考虑，防止枚举邮箱）
    if (!user) {
      const response: ApiResponse<null> = {
        code: 200,
        data: null,
        message: '如果该邮箱存在，重置邮件已发送',
      };
      return NextResponse.json(response);
    }

    // 生成随机令牌
    const token = crypto.randomBytes(32).toString('hex');

    // 保存重置记录
    await PasswordReset.create({
      email,
      token,
      used: false,
    });

    // 发送邮件
    await emailService.sendPasswordResetEmail(email, token);

    const response: ApiResponse<null> = {
      code: 200,
      data: null,
      message: '重置邮件已发送，请检查邮箱',
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error('忘记密码错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

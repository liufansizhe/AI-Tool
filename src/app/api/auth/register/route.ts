import type {
  ApiResponse,
  LoginResult,
  User as UserType,
} from "@/shared/types/api";
import { NextRequest, NextResponse } from "next/server";

import { User } from "@/models";
import connectDB from "@/server/db/mongodb";
import { generateToken } from "@/server/auth";

/**
 * 用户注册
 * POST /api/auth/register
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<LoginResult | null>>> {
  try {
    await connectDB();

    const body = await request.json();

    // 参数验证
    if (!body.username || !body.email || !body.password) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: "用户名、邮箱和密码不能为空",
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 检查用户名是否已存在
    const existingUser = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (existingUser) {
      const response: ApiResponse<null> = {
        code: 409,
        data: null,
        message: "用户名或邮箱已存在",
      };
      return NextResponse.json(response, { status: 409 });
    }

    // 创建新用户
    const user = await User.create({
      username: body.username,
      email: body.email,
      password: body.password,
      role: "user",
    });

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
      message: "注册成功",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("注册错误:", error);

    // 处理 Mongoose 验证错误
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    if (err.name === "ValidationError") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages = Object.values(err.errors).map((e: any) => e.message);
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: messages.join(", "),
      };
      return NextResponse.json(response, { status: 400 });
    }

    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: "服务器内部错误",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

import type { ApiResponse, User as UserType } from "@/shared/types/api";
import { NextRequest, NextResponse } from "next/server";

import { authenticateRequest } from "@/server/auth";
import { userService } from "@/server/services";

/**
 * 获取用户详情
 * GET /api/user/:id
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const user = await userService.getUserById(id);

    if (!user) {
      const response: ApiResponse<null> = {
        code: 404,
        data: null,
        message: "用户不存在",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<UserType> = {
      code: 200,
      data: user,
      message: "获取成功",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("获取用户详情错误:", error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: "服务器内部错误",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * 更新用户
 * PUT /api/user/:id
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;

    // 只能更新自己的信息（管理员除外）
    if (auth.user!.userId !== id && auth.user!.role !== "admin") {
      const response: ApiResponse<null> = {
        code: 403,
        data: null,
        message: "无权修改此用户信息",
      };
      return NextResponse.json(response, { status: 403 });
    }

    const body = await request.json();
    const user = await userService.updateUserInfo(id, body);

    if (!user) {
      const response: ApiResponse<null> = {
        code: 404,
        data: null,
        message: "用户不存在",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<UserType> = {
      code: 200,
      data: user,
      message: "更新成功",
    };

    return NextResponse.json(response);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("更新用户错误:", error);

    if (error.name === "ValidationError") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const messages = Object.values(error.errors).map((e: any) => e.message);
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

/**
 * 删除用户
 * DELETE /api/user/:id
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    // 只有管理员可以删除用户
    if (auth.user!.role !== "admin") {
      const response: ApiResponse<null> = {
        code: 403,
        data: null,
        message: "无权删除用户",
      };
      return NextResponse.json(response, { status: 403 });
    }

    const { id } = await params;
    const user = await userService.delete(id);

    if (!user) {
      const response: ApiResponse<null> = {
        code: 404,
        data: null,
        message: "用户不存在",
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<null> = {
      code: 200,
      data: null,
      message: "删除成功",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("删除用户错误:", error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: "服务器内部错误",
    };
    return NextResponse.json(response, { status: 500 });
  }
}

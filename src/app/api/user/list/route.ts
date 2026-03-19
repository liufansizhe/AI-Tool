import { NextRequest, NextResponse } from 'next/server';
import { userService } from '@/server/services';
import { authenticateRequest } from '@/server/auth';
import type { ApiResponse, PaginationData, User as UserType } from '@/shared/types/api';

/**
 * 获取用户列表
 * GET /api/user/list?page=1&pageSize=10&keyword=xxx
 */
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const keyword = searchParams.get('search') || '';

    // 参数验证
    if (page < 1 || pageSize < 1 || pageSize > 100) {
      const response: ApiResponse<null> = {
        code: 400,
        data: null,
        message: '分页参数无效',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // 使用封装好的 Service 查询
    const result = await userService.getUserList({
      page,
      pageSize,
      keyword,
      sort: { createdAt: -1 },
    });

    const response: ApiResponse<PaginationData<UserType>> = {
      code: 200,
      data: {
        list: result.list,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize,
      },
      message: '获取成功',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('获取用户列表错误:', error);
    const response: ApiResponse<null> = {
      code: 500,
      data: null,
      message: '服务器内部错误',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

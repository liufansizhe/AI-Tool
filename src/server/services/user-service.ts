import { BaseService } from '@/server/db/base-service';
import { User } from '@/models';
import type { IUser } from '@/models';
import type { PaginationOptions, PaginationResult } from '@/server/db/base-service';

export interface UserListItem {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface UserSearchOptions extends PaginationOptions {
  keyword?: string;
}

class UserService extends BaseService<IUser> {
  constructor() {
    super(User);
  }

  /**
   * 根据用户名或邮箱查找用户
   */
  async findByUsernameOrEmail(usernameOrEmail: string): Promise<IUser | null> {
    return this.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  /**
   * 查找用户（包含密码字段）
   */
  async findWithPassword(usernameOrEmail: string): Promise<IUser | null> {
    await this.ensureConnected();
    return User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select('+password');
  }

  /**
   * 获取用户列表（带搜索）
   */
  async getUserList(options: UserSearchOptions = {}): Promise<PaginationResult<UserListItem>> {
    const { keyword, ...paginationOptions } = options;

    const result = await this.search(
      keyword || '',
      ['username', 'email'] as (keyof IUser)[],
      paginationOptions
    );

    return {
      ...result,
      list: result.list.map(this.transformToListItem),
    };
  }

  /**
   * 获取用户详情
   */
  async getUserById(id: string): Promise<UserListItem | null> {
    const user = await this.findById(id);
    return user ? this.transformToListItem(user) : null;
  }

  /**
   * 更新用户信息（排除密码和角色）
   */
  async updateUserInfo(id: string, data: Partial<IUser>): Promise<UserListItem | null> {
    // 排除敏感字段
    const { password: _pwd, role: _role, ...updateData } = data;

    const user = await this.update(id, updateData as Partial<IUser>);
    return user ? this.transformToListItem(user) : null;
  }

  /**
   * 检查用户名是否已存在
   */
  async isUsernameExists(username: string, excludeId?: string): Promise<boolean> {
    const filter: Record<string, unknown> = { username };
    if (excludeId) {
      filter._id = { $ne: excludeId };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.exists(filter as any);
  }

  /**
   * 检查邮箱是否已存在
   */
  async isEmailExists(email: string, excludeId?: string): Promise<boolean> {
    const filter: Record<string, unknown> = { email };
    if (excludeId) {
      filter._id = { $ne: excludeId };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.exists(filter as any);
  }

  /**
   * 转换用户数据为列表项格式
   */
  private transformToListItem(user: IUser): UserListItem {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    };
  }
}

// 导出单例实例
export const userService = new UserService();

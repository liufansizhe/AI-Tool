import type { Model, Document, SortOrder, UpdateQuery } from 'mongoose';
import connectDB from './mongodb';

// 定义 FilterQuery 类型
type FilterQuery<T> = Record<string, unknown>;

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sort?: Record<string, SortOrder>;
}

export interface PaginationResult<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export class BaseService<T extends Document> {
  constructor(protected model: Model<T>) {}

  /**
   * 确保数据库已连接
   */
  protected async ensureConnected(): Promise<void> {
    await connectDB();
  }

  /**
   * 创建文档
   */
  async create(data: Partial<T>): Promise<T> {
    await this.ensureConnected();
    const doc = new this.model(data);
    return doc.save();
  }

  /**
   * 根据 ID 查找
   */
  async findById(id: string): Promise<T | null> {
    await this.ensureConnected();
    return this.model.findById(id);
  }

  /**
   * 查找单个文档
   */
  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    await this.ensureConnected();
    return this.model.findOne(filter);
  }

  /**
   * 查找多个文档
   */
  async find(filter: FilterQuery<T> = {}, sort?: Record<string, SortOrder>): Promise<T[]> {
    await this.ensureConnected();
    let query = this.model.find(filter);
    if (sort) {
      query = query.sort(sort);
    }
    return query.exec();
  }

  /**
   * 更新文档
   */
  async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    await this.ensureConnected();
    return this.model.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
  }

  /**
   * 删除文档
   */
  async delete(id: string): Promise<T | null> {
    await this.ensureConnected();
    return this.model.findByIdAndDelete(id);
  }

  /**
   * 分页查询
   */
  async paginate(
    filter: FilterQuery<T> = {},
    options: PaginationOptions = {}
  ): Promise<PaginationResult<T>> {
    await this.ensureConnected();

    const page = Math.max(1, options.page || 1);
    const pageSize = Math.min(100, Math.max(1, options.pageSize || 10));
    const sort = options.sort || { createdAt: -1 as SortOrder };

    const skip = (page - 1) * pageSize;

    // 并行执行查询和计数
    const [list, total] = await Promise.all([
      this.model.find(filter).sort(sort).skip(skip).limit(pageSize).exec(),
      this.model.countDocuments(filter),
    ]);

    return {
      list,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  /**
   * 搜索分页查询（支持关键词搜索）
   */
  async search(
    keyword: string,
    searchFields: (keyof T)[],
    options: PaginationOptions = {},
    additionalFilter: FilterQuery<T> = {}
  ): Promise<PaginationResult<T>> {
    const filter: FilterQuery<T> = { ...additionalFilter };

    if (keyword && searchFields.length > 0) {
      filter.$or = searchFields.map((field) => ({
        [field]: { $regex: keyword, $options: 'i' },
      })) as FilterQuery<T>[];
    }

    return this.paginate(filter, options);
  }

  /**
   * 统计数量
   */
  async count(filter: FilterQuery<T> = {}): Promise<number> {
    await this.ensureConnected();
    return this.model.countDocuments(filter);
  }

  /**
   * 检查是否存在
   */
  async exists(filter: FilterQuery<T>): Promise<boolean> {
    await this.ensureConnected();
    const count = await this.model.countDocuments(filter);
    return count > 0;
  }
}

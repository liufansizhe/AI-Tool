import mongoose from 'mongoose';
import { config } from '@/config/env';

const MONGODB_URI = config.database.uri;

if (!MONGODB_URI) {
  throw new Error('数据库连接字符串未配置，请在 .env.local 文件中设置 MONGODB_URI 环境变量');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached?.conn) {
    console.log(`[${config.mode}] 使用缓存的 MongoDB 连接`);
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      ...config.database.options,
    };

    console.log(`[${config.mode}] 正在连接 MongoDB: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log(`[${config.mode}] MongoDB 连接成功`);
      return mongoose;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    console.error(`[${config.mode}] MongoDB 连接失败:`, e);
    throw e;
  }

  return cached!.conn;
}

export default connectDB;

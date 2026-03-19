// 环境配置管理
// 根据不同环境加载不同的配置

export type EnvMode = 'development' | 'test' | 'production' | string;

export interface DatabaseConfig {
  uri: string;
  options?: {
    maxPoolSize?: number;
    serverSelectionTimeoutMS?: number;
    socketTimeoutMS?: number;
  };
}

export interface AppConfig {
  // 环境标识
  mode: EnvMode;
  isDev: boolean;
  isTest: boolean;
  isProd: boolean;

  // 服务器配置
  port: number;
  host: string;

  // 数据库配置
  database: DatabaseConfig;

  // JWT 配置
  jwt: {
    secret: string;
    expiresIn: string;
  };

  // API 配置
  api: {
    prefix: string;
    timeout: number;
  };

  // 客户端配置
  client: {
    apiUrl: string;
  };

  // 邮件配置
  email: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    from: string;
  };
}

// 基础配置（所有环境共享）
const baseConfig: Partial<AppConfig> = {
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    expiresIn: '7d',
  },
  api: {
    prefix: '/api',
    timeout: 10000,
  },
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '',
    },
    from: process.env.EMAIL_FROM || 'noreply@example.com',
  },
};

// 开发环境配置
const developmentConfig: Partial<AppConfig> = {
  mode: 'development',
  isDev: true,
  isTest: false,
  isProd: false,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nextjs_dev',
    options: {
      maxPoolSize: 10,
    },
  },
  client: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
};

// 测试环境配置
const testConfig: Partial<AppConfig> = {
  mode: 'test',
  isDev: false,
  isTest: true,
  isProd: false,
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/nextjs_test',
    options: {
      maxPoolSize: 5,
    },
  },
  client: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
};

// 生产环境配置
const productionConfig: Partial<AppConfig> = {
  mode: 'production',
  isDev: false,
  isTest: false,
  isProd: true,
  database: {
    uri: process.env.MONGODB_URI!, // 生产环境必须从环境变量读取
    options: {
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  },
  client: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  },
};

// 配置映射
const configMap: Record<string, Partial<AppConfig>> = {
  development: developmentConfig,
  dev: developmentConfig,
  test: testConfig,
  testing: testConfig,
  production: productionConfig,
  prod: productionConfig,
};

// 获取当前环境
function getCurrentMode(): EnvMode {
  return process.env.NODE_ENV || 'development';
}

// 合并配置
function mergeConfig(mode: EnvMode): AppConfig {
  const envConfig = configMap[mode] || developmentConfig;

  return {
    ...baseConfig,
    ...envConfig,
  } as AppConfig;
}

// 导出配置实例
export const config: AppConfig = mergeConfig(getCurrentMode());

// 导出配置获取函数（用于动态获取）
export function getConfig(mode?: EnvMode): AppConfig {
  return mergeConfig(mode || getCurrentMode());
}

// 导出默认配置
export default config;

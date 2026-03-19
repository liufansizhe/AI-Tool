import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SCSS 配置
  sassOptions: {
    additionalData: `@use "@/styles/theme" as *;`,
  },

  // 图片优化配置
  images: {
    unoptimized: true,
  },

  // 输出配置（全栈模式，支持 API 路由）
  // 如需静态导出，请改为 output: 'export'
  // output: 'export',
  distDir: 'dist',

  //  trailingSlash 用于静态导出
  trailingSlash: true,

  // 环境变量
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
};

export default nextConfig;

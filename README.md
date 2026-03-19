# Next.js 全栈脚手架

功能完整的 Next.js 项目脚手架，采用分层架构设计，集成 SCSS 主题、Ant Design、MongoDB 数据库、多语言、状态管理、移动端适配和 Electron 桌面客户端。

## 技术栈

- **框架**: Next.js 15 + React 19 + TypeScript
- **样式**: SCSS + CSS Modules
- **组件库**: Ant Design 6
- **状态管理**: Zustand + persist 中间件
- **HTTP 请求**: Axios 封装
- **数据库**: MongoDB + Mongoose
- **认证**: JWT (jsonwebtoken + bcryptjs)
- **移动端**: 响应式布局 + 移动端适配
- **桌面端**: Electron 桌面应用

---

## 目录结构

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由（服务端接口）
│   │   │   ├── auth/         # 认证接口 (login, logout, register, user)
│   │   │   └── user/         # 用户接口 (list, [id])
│   │   ├── page.tsx          # 首页
│   │   ├── layout.tsx        # 根布局
│   │   ├── about/            # 关于页面
│   │   └── login/            # 登录页面
│   │
│   ├── client/                # 前端代码
│   │   ├── components/       # React 组件
│   │   │   ├── main-layout.tsx
│   │   │   ├── mobile-layout.tsx
│   │   │   ├── responsive-layout.tsx
│   │   │   ├── i18n-provider.tsx
│   │   │   └── theme-provider.tsx
│   │   ├── hooks/            # 自定义 Hooks
│   │   │   ├── use-mobile.ts
│   │   │   └── use-logout.ts
│   │   └── services/         # 前端 API 调用
│   │       ├── request.ts    # HTTP 请求封装
│   │       ├── auth.ts       # 认证相关 API
│   │       └── user.ts       # 用户相关 API
│   │
│   ├── server/                # 后端代码
│   │   ├── auth/             # 认证相关
│   │   │   ├── jwt.ts        # JWT 生成与验证
│   │   │   └── auth.ts       # 请求认证
│   │   ├── db/               # 数据库
│   │   │   ├── mongodb.ts    # MongoDB 连接
│   │   │   └── base-service.ts # 基础 Service 类
│   │   └── services/         # 业务逻辑 Service
│   │       └── user-service.ts
│   │
│   ├── shared/                # 前后端共享代码
│   │   ├── types/            # TypeScript 类型定义
│   │   ├── utils/            # 通用工具函数
│   │   └── constants/        # 常量定义
│   │
│   ├── models/                # 数据模型 (Mongoose)
│   │   ├── user.ts           # 用户模型
│   │   └── index.ts
│   │
│   ├── stores/                # 状态管理 (Zustand)
│   │   ├── theme.ts          # 主题状态
│   │   ├── user.ts           # 用户状态
│   │   └── index.ts
│   │
│   ├── styles/                # 样式文件
│   │   ├── global.scss       # 全局样式
│   │   ├── theme.scss        # 主题变量
│   │   ├── antd.scss         # Ant Design 覆盖
│   │   ├── pages/            # 页面样式
│   │   │   └── login.module.scss
│   │   └── components/       # 组件样式
│   │       └── mobile-layout.module.scss
│   │
│   ├── config/                # 配置文件
│   │   ├── env.ts            # 环境配置
│   │   └── index.ts
│   │
│   └── i18n/                  # 国际化
│       ├── config.ts
│       └── messages/         # 语言文件
│           ├── zh.json
│           └── en.json
│
├── electron/                  # Electron 桌面应用
│   ├── main.js
│   └── preload.js
│
├── .env.development           # 开发环境配置
├── .env.test                  # 测试环境配置
├── .env.production            # 生产环境配置
└── package.json
```

---

## 开发流程

### 环境准备

```bash
# 1. 克隆项目后安装依赖
npm install

# 2. 复制环境配置模板
cp .env.example .env.development
cp .env.example .env.test
cp .env.example .env.production

# 3. 编辑各环境的 MongoDB 连接字符串
vim .env.development  # 开发环境
vim .env.production   # 生产环境
```

### 启动 MongoDB（本地开发）

```bash
# macOS (Homebrew)
brew services start mongodb-community

# 或使用 Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# 或使用 MongoDB Atlas（云端，无需本地安装）
# 注册 https://www.mongodb.com/atlas 获取免费数据库
```

### 运行项目

```bash
# 开发环境（http://localhost:3000）
npm run dev

# 测试环境（http://localhost:3001）
npm run dev:test

# 生产环境（http://localhost:3002）
npm run dev:prod
```

---

## 前端开发

### 1. 创建新页面

在 `src/app/` 下创建页面文件夹：

```bash
mkdir src/app/dashboard
touch src/app/dashboard/page.tsx
```

```tsx
// src/app/dashboard/page.tsx
'use client';

import { Card } from 'antd';
import { ResponsiveLayout } from '@/client/components';
import { useI18n } from '@/client/components';

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <ResponsiveLayout>
      <Card title="Dashboard">
        <p>页面内容</p>
      </Card>
    </ResponsiveLayout>
  );
}
```

### 2. 添加页面样式

```scss
// src/styles/pages/dashboard.module.scss
.dashboardContainer {
  padding: 24px;

  .statsCard {
    margin-bottom: 16px;
  }
}
```

```tsx
import styles from '@/styles/pages/dashboard.module.scss';

export default function DashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <Card className={styles.statsCard}>...</Card>
    </div>
  );
}
```

### 3. 调用后端 API

```tsx
// 在组件中调用 API
import { getUserList, login } from '@/client/services';

// 获取用户列表
const users = await getUserList({ page: 1, pageSize: 10 });

// 登录
const result = await login({ username: 'admin', password: '123456' });
```

### 4. 状态管理

```tsx
// 使用 Zustand 状态
import { useUserStore, useThemeStore } from '@/stores';

function MyComponent() {
  // 用户状态
  const { user, isLogin, setUser, logout } = useUserStore();

  // 主题状态
  const { mode, setMode } = useThemeStore();

  return (
    <div>
      {isLogin && <span>欢迎, {user?.username}</span>}
      <button onClick={() => setMode('dark')}>切换暗色主题</button>
    </div>
  );
}
```

---

## 后端开发

### 1. 创建新 API 接口

在 `src/app/api/` 下创建路由文件：

```bash
mkdir src/app/api/posts
touch src/app/api/posts/route.ts        # GET /api/posts, POST /api/posts
touch src/app/api/posts/[id]/route.ts   # GET /api/posts/:id, PUT /api/posts/:id
```

```ts
// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/server/auth';
import type { ApiResponse } from '@/shared/types';

// GET /api/posts
export async function GET(request: NextRequest) {
  try {
    // 认证检查
    const auth = authenticateRequest(request);
    if (!auth.success) {
      return NextResponse.json(
        { code: 401, data: null, message: auth.error },
        { status: 401 }
      );
    }

    // 获取数据
    const posts = await fetchPosts();

    return NextResponse.json({
      code: 200,
      data: posts,
      message: '获取成功'
    });
  } catch (error) {
    return NextResponse.json(
      { code: 500, data: null, message: '服务器错误' },
      { status: 500 }
    );
  }
}
```

### 2. 创建数据模型

```ts
// src/models/post.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
}

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
```

### 3. 创建 Service 层

```ts
// src/server/services/post-service.ts
import { BaseService } from '@/server/db';
import { Post } from '@/models';
import type { IPost } from '@/models';

class PostService extends BaseService<IPost> {
  constructor() {
    super(Post);
  }

  // 自定义业务方法
  async findByAuthor(authorId: string) {
    return this.find({ author: authorId });
  }
}

export const postService = new PostService();
```

### 4. 添加前端 API 调用

```ts
// src/client/services/post.ts
import { get, post } from './request';
import type { Post } from '@/shared/types';

export function getPosts() {
  return get<Post[]>('/posts');
}

export function createPost(data: Omit<Post, 'id'>) {
  return post<Post>('/posts', data);
}
```

---

## 数据库开发

### MongoDB 数据结构

```
Database: nextjs_app
├── Collection: users
│   ├── _id: ObjectId
│   ├── username: String (unique)
│   ├── email: String (unique)
│   ├── password: String (hashed)
│   ├── role: String (admin|user)
│   ├── avatar: String
│   ├── createdAt: Date
│   └── updatedAt: Date
│
└── Collection: posts (示例)
    ├── _id: ObjectId
    ├── title: String
    ├── content: String
    ├── author: ObjectId (ref: users)
    └── createdAt: Date
```

### 数据库操作示例

```ts
// 查询
const user = await User.findById(id);
const users = await User.find({ role: 'user' }).limit(10);

// 创建
const newUser = await User.create({
  username: 'test',
  email: 'test@example.com',
  password: '123456'
});

// 更新
await User.findByIdAndUpdate(id, { $set: { username: 'newName' } });

// 删除
await User.findByIdAndDelete(id);
```

### 使用 BaseService 封装

```ts
import { postService } from '@/server/services';

// 分页查询
const result = await postService.paginate(
  { author: userId },  // filter
  { page: 1, pageSize: 10, sort: { createdAt: -1 } }
);

// 搜索
const result = await postService.search(
  '关键词',
  ['title', 'content'],  // 搜索字段
  { page: 1, pageSize: 10 }
);
```

---

## 部署流程

### 需要购买的服务

| 服务 | 推荐方案 | 费用参考 | 说明 |
|------|----------|----------|------|
| **云服务器** | 阿里云 ECS / 腾讯云 CVM | ￥99-300/年 | 2核4G 配置即可 |
| **域名** | 阿里云 / 腾讯云 / GoDaddy | ￥30-100/年 | .com/.cn 域名 |
| **数据库** | MongoDB Atlas (免费) | 免费-￥200/月 | 512MB-5GB 存储 |
| **CDN** | 阿里云 CDN / Cloudflare | 免费-按量计费 | 静态资源加速 |

### 方案 A：单机部署（适合个人项目）

```
云服务器（1台）
├── Next.js 应用（3000端口）
│   └── 前端 + 后端 API
├── Nginx（80/443端口）
│   ├── 反向代理到 3000
│   └── 静态资源缓存
└── MongoDB（27017端口，仅本地访问）
    └── 数据持久化到 /data/db
```

**部署步骤：**

```bash
# 1. 购买云服务器后，SSH 登录
ssh root@your-server-ip

# 2. 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 3. 安装 PM2（进程管理）
npm install -g pm2

# 4. 安装 MongoDB
apt-get install -y mongodb
systemctl start mongodb

# 5. 克隆代码并构建
git clone your-repo.git
cd your-project
npm install
npm run build:prod

# 6. 配置环境变量
vim .env.production
# MONGODB_URI=mongodb://localhost:27017/nextjs_prod
# JWT_SECRET=your-strong-secret-key

# 7. 启动应用
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup

# 8. 安装 Nginx
apt-get install -y nginx

# 9. 配置 Nginx
cat > /etc/nginx/sites-available/nextjs << 'EOF'
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -s /etc/nginx/sites-available/nextjs /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# 10. 配置 HTTPS（使用 Certbot）
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

### 方案 B：分离部署（适合生产环境）

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   前端 (Vercel)  │────▶│  后端 (云服务器) │────▶│  MongoDB Atlas │
│   静态托管       │     │   API 服务      │     │   云端数据库    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │
        ▼                       ▼
   自动部署                   PM2 守护
```

**前端部署（Vercel - 免费）：**

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录并部署
vercel login
vercel --prod

# 3. 配置环境变量
vercel env add NEXT_PUBLIC_API_URL
# 输入: https://api.your-domain.com/api
```

**后端部署（云服务器）：**

```bash
# 1. 服务器上克隆代码
git clone your-repo.git
cd your-project

# 2. 安装依赖
npm install

# 3. 构建生产版本
npm run build:prod

# 4. 配置环境变量（连接 MongoDB Atlas）
vi .env.production
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nextjs_prod
# JWT_SECRET=your-strong-secret-key
# NEXT_PUBLIC_API_URL=https://api.your-domain.com

# 5. 使用 PM2 启动
pm2 start npm --name "nextjs-api" -- start
pm2 save
pm2 startup
```

**MongoDB Atlas 配置：**

1. 注册 https://www.mongodb.com/atlas
2. 创建免费集群（M0）
3. 添加数据库用户
4. 配置网络访问（允许所有 IP: 0.0.0.0/0）
5. 获取连接字符串：
   ```
   mongodb+srv://username:password@cluster.mongodb.net/nextjs_prod?retryWrites=true&w=majority
   ```

### 方案 C：Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:prod

EXPOSE 3000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/nextjs_prod
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo
    restart: always

  mongo:
    image: mongo:7
    volumes:
      - mongo_data:/data/db
    restart: always

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: always

volumes:
  mongo_data:
```

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 更新部署
docker-compose down
git pull
docker-compose up --build -d
```

---

## CI/CD 自动化部署

### GitHub Actions 配置

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:prod

      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/nextjs-app
            git pull
            npm install
            npm run build:prod
            pm2 restart nextjs-app
```

---

## 常用命令速查

```bash
# 开发
npm run dev              # 开发模式
npm run dev:test         # 测试环境
npm run dev:prod         # 生产环境

# 构建
npm run build:dev        # 开发构建
npm run build:test       # 测试构建
npm run build:prod       # 生产构建

# 代码检查
npm run lint             # ESLint 检查
npm run lint:fix         # 自动修复

# Electron
npm run electron:dev     # Electron 开发
npm run electron:build   # Electron 打包

# PM2 管理
pm2 start npm --name "app" -- start
pm2 restart app
pm2 stop app
pm2 logs app
pm2 monit
```

---

## 测试账号

```
用户名: admin
密码: 123456
```

---

## License

MIT

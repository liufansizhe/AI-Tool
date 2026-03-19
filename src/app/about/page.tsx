"use client";

import { Card, Descriptions, Typography } from "antd";

import { ResponsiveLayout } from "@/client/components/responsive-layout";
import { useI18n } from "@/client/components/i18n-provider";

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  const { t } = useI18n();

  const techStack = [
    { label: "框架", value: "Next.js 15 + React 19 + TypeScript" },
    {
      label: "样式",
      value: "SCSS (主题配置: {button: {light: xxx, dark: xxx}})",
    },
    { label: "组件库", value: "Ant Design 5" },
    { label: "状态管理", value: "Zustand + persist 中间件" },
    { label: "HTTP 请求", value: "Axios 封装" },
    { label: "数据库", value: "MongoDB + Mongoose" },
    { label: "认证", value: "JWT (jsonwebtoken)" },
    { label: "移动端", value: "响应式布局 + 移动端适配" },
    { label: "客户端", value: "Electron 桌面应用" },
  ];

  const folderStructure = [
    { label: "src/app/", value: "Next.js App Router (页面和API)" },
    { label: "src/app/api/", value: "服务端接口 (auth/, user/)" },
    { label: "src/server/", value: "服务端代码 (services/, auth/, db/)" },
    {
      label: "src/client/",
      value: "客户端代码 (components/, hooks/, services/)",
    },
    { label: "src/shared/", value: "共享代码 (types/, utils/, constants/)" },
    { label: "src/stores/", value: "Zustand 状态管理" },
    { label: "src/styles/", value: "SCSS 样式和主题配置" },
    { label: "src/models/", value: "Mongoose 数据模型" },
    { label: "src/config/", value: "配置文件" },
    { label: "src/i18n/", value: "国际化配置" },
    { label: "electron/", value: "Electron 主进程和预加载脚本" },
  ];

  return (
    <ResponsiveLayout>
      <Card variant='borderless'>
        <Title level={2}>关于项目</Title>
        <Paragraph>
          这是一个功能完整的 Next.js
          脚手架项目，采用现代化的技术栈和清晰的目录结构， 支持 MongoDB
          数据库、移动端响应式布局和 Electron 桌面客户端。
        </Paragraph>

        <Title level={3} style={{ marginTop: 32 }}>
          技术栈
        </Title>
        <Descriptions
          bordered
          column={1}
          items={techStack.map((item) => ({
            label: item.label,
            children: item.value,
          }))}
        />

        <Title level={3} style={{ marginTop: 32 }}>
          目录结构
        </Title>
        <Descriptions
          bordered
          column={1}
          items={folderStructure.map((item) => ({
            label: item.label,
            children: item.value,
          }))}
        />
      </Card>
    </ResponsiveLayout>
  );
}

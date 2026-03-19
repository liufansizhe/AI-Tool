import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI工具箱 - 发现最实用的AI工具",
  description:
    "精选全球优质AI工具，包括AI对话、AI绘画、AI写作、AI视频、编程助手等，帮你快速找到合适的AI助手，提升工作效率。",
  keywords: "AI工具, AI导航, ChatGPT, AI绘画, AI写作, 人工智能工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <body className='antialiased min-h-screen flex flex-col'>
        <Analytics />
        {children}
      </body>
    </html>
  );
}

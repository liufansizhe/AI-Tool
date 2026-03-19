import "./globals.css";

import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "AI工具箱 - 发现最实用的AI工具",
  description:
    "精选全球优质AI工具，包括AI对话、AI绘画、AI写作、AI视频、编程助手等，帮你快速找到合适的AI助手，提升工作效率。",
  keywords: "AI工具, AI导航, ChatGPT, AI绘画, AI写作, 人工智能工具",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='zh-CN'>
      <body className='antialiased min-h-screen flex flex-col'>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

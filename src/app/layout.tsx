import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from '@/client/components/theme-provider';
import { I18nProvider } from '@/client/components/i18n-provider';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import '@/styles/global.scss';
import '@/styles/antd.scss';

export const metadata: Metadata = {
  title: 'Next.js 脚手架',
  description: '支持多语言、主题切换和全局状态管理的 Next.js 项目',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body>
        <AntdRegistry>
          <ThemeProvider>
            <I18nProvider>
              <ConfigProvider
                locale={zhCN}
                theme={{
                  token: {
                    colorPrimary: '#1677ff',
                    borderRadius: 6,
                  },
                }}
              >
                {children}
              </ConfigProvider>
            </I18nProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

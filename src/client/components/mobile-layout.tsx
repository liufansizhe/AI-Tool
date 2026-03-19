'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Drawer,
  Button,
  Space,
  Avatar,
  Dropdown,
  message,
  Menu,
  ConfigProvider,
  theme as antdTheme,
} from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  MenuOutlined,
  MoonOutlined,
  SunOutlined,
  GlobalOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useThemeStore, useUserStore } from '@/stores';
import { useI18n } from './i18n-provider';
import { useLogout } from '@/client/hooks';
import styles from '@/styles/components/mobile-layout.module.scss';
import type { ThemeMode } from '@/shared/types/theme';

const { defaultAlgorithm, darkAlgorithm } = antdTheme;

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mode, setMode } = useThemeStore();
  const { user, isLogin } = useUserStore();
  const { locale, setLocale, t } = useI18n();
  const { logout: handleLogout } = useLogout();

  // 判断当前主题
  const isDark =
    mode === 'dark' ||
    (mode === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  const tabItems = [
    { key: '/', icon: <HomeOutlined />, label: t('nav.home') },
    { key: '/about', icon: <UserOutlined />, label: t('nav.about') },
    { key: '/settings', icon: <SettingOutlined />, label: t('nav.settings') },
  ];


  const menuItems = [
    { key: '/', icon: <HomeOutlined />, label: t('nav.home') },
    { key: '/about', icon: <UserOutlined />, label: t('nav.about') },
    {
      key: 'theme',
      icon: isDark ? <MoonOutlined /> : <SunOutlined />,
      label: t('theme.title'),
      children: [
        { key: 'light', label: t('theme.light') },
        { key: 'dark', label: t('theme.dark') },
        { key: 'system', label: t('theme.system') },
      ],
    },
    {
      key: 'language',
      icon: <GlobalOutlined />,
      label: t('nav.language'),
      children: [
        { key: 'zh', label: '中文' },
        { key: 'en', label: 'English' },
      ],
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (['light', 'dark', 'system'].includes(key)) {
      setMode(key as ThemeMode);
    } else if (['zh', 'en'].includes(key)) {
      setLocale(key as typeof locale);
    } else {
      router.push(key);
    }
    setDrawerOpen(false);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <div className={styles.mobileLayout}>
        {/* 顶部导航 */}
        <header className={styles.mobileHeader}>
          <div className={styles.logo}>Next.js</div>
          <div className={styles.actions}>
            {isLogin ? (
              <Dropdown
                menu={{
                  items: [
                    { key: 'profile', label: t('user.profile') },
                    { key: 'settings', label: t('user.settings') },
                    { type: 'divider' },
                    { key: 'logout', label: t('user.logout'), onClick: handleLogout },
                  ],
                }}
                placement="bottomRight"
              >
                <Avatar src={user?.avatar} icon={<UserOutlined />} size="small" />
              </Dropdown>
            ) : (
              <Button type="primary" size="small" onClick={() => router.push('/login')}>
                {t('nav.login')}
              </Button>
            )}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
        </header>

        {/* 侧边抽屉菜单 */}
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          className={styles.drawer}
          width={280}
        >
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Drawer>

        {/* 内容区域 */}
        <main className={styles.mobileContent}>{children}</main>

        {/* 底部 Tab 导航 */}
        <nav className={styles.mobileTabBar}>
          {tabItems.map((item) => (
            <div
              key={item.key}
              className={`${styles.tabItem} ${pathname === item.key ? styles.active : ''}`}
              onClick={() => router.push(item.key)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </ConfigProvider>
  );
}

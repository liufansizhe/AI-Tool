'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { MainLayout } from './main-layout';
import { MobileLayout } from './mobile-layout';

// 简单的媒体查询订阅
function getServerSnapshot() {
  return false;
}

function getSnapshot() {
  return window.innerWidth <= 768;
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 延迟设置 mounted，避免hydration不匹配
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // 避免服务端渲染不匹配，首次渲染使用桌面布局
  if (!mounted) {
    return <MainLayout>{children}</MainLayout>;
  }

  return isMobile ? (
    <MobileLayout>{children}</MobileLayout>
  ) : (
    <MainLayout>{children}</MainLayout>
  );
}

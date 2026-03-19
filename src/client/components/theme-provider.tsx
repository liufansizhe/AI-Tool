'use client';

import { type ReactNode } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 主题 Provider
 * 主题应用逻辑已在 theme store 中处理（applyTheme 函数）
 * 此组件仅作为主题上下文的占位符，实际主题状态通过 Zustand store 管理
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  return <>{children}</>;
}

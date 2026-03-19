// 主题类型定义

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  success: string;
  warning: string;
  error: string;
  bg: string;
  bgContainer: string;
  bgElevated: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  border: string;
}

export interface ComponentTheme {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface ThemeConfig {
  button: ComponentTheme;
  card: ComponentTheme;
  header: ComponentTheme;
  menu: ComponentTheme;
}

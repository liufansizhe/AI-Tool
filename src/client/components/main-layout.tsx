"use client";

import { Avatar, Button, Dropdown, Layout, Menu, Space, message } from "antd";
import {
  DesktopOutlined,
  GlobalOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { useThemeStore, useUserStore } from "@/stores";

import { ChangePasswordModal } from "./profile/change-password-modal";
import type { ThemeMode } from "@/shared/types/theme";
import { useI18n } from "./i18n-provider";
import { useLogout } from "@/client/hooks";
import { useState } from "react";

const { Header, Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode } = useThemeStore();
  const { user, isLogin } = useUserStore();
  const { locale, setLocale, t } = useI18n();
  const { logout: handleLogout } = useLogout();
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: t("nav.home"),
    },
    {
      key: "/about",
      icon: <UserOutlined />,
      label: t("nav.about"),
    },
  ];

  const themeItems = [
    { key: "light", icon: <SunOutlined />, label: t("theme.light") },
    { key: "dark", icon: <MoonOutlined />, label: t("theme.dark") },
    { key: "system", icon: <DesktopOutlined />, label: t("theme.system") },
  ];

  const localeItems = [
    { key: "zh", label: "中文" },
    { key: "en", label: "English" },
  ];

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("user.profile"),
    },
    {
      key: "changePassword",
      icon: <LockOutlined />,
      label: "修改密码",
      onClick: () => setChangePasswordOpen(true),
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: t("user.settings"),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: t("user.logout"),
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        theme='light'
        collapsible
        style={{ overflow: "auto", height: "100%" }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Next.js
        </div>
        <Menu
          mode='inline'
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      <Layout style={{ overflow: "hidden" }}>
        <Header
          style={{
            background: "var(--bgContainer)",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div />
          <Space>
            <Dropdown
              menu={{
                items: themeItems.map((item) => ({
                  ...item,
                  onClick: () => setMode(item.key as ThemeMode),
                })),
              }}
            >
              <Button
                icon={mode === "dark" ? <MoonOutlined /> : <SunOutlined />}
              >
                {themeItems.find((item) => item.key === mode)?.label}
              </Button>
            </Dropdown>

            <Dropdown
              menu={{
                items: localeItems.map((item) => ({
                  key: item.key,
                  label: item.label,
                  onClick: () => setLocale(item.key as typeof locale),
                })),
              }}
            >
              <Button icon={<GlobalOutlined />}>
                {locale === "zh" ? "中文" : "English"}
              </Button>
            </Dropdown>

            {isLogin ? (
              <Dropdown menu={{ items: userMenuItems }}>
                <Space style={{ cursor: "pointer" }}>
                  <Avatar src={user?.avatar} icon={<UserOutlined />} />
                  <span>{user?.username}</span>
                </Space>
              </Dropdown>
            ) : (
              <Button type='primary' onClick={() => router.push("/login")}>
                {t("nav.login")}
              </Button>
            )}
          </Space>
        </Header>
        <Content
          style={{
            margin: 24,
            padding: 24,
            background: "var(--bgContainer)",
            borderRadius: 8,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>

      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
        username={user?.username || ""}
      />
    </Layout>
  );
}

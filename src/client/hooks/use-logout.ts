'use client';

import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { logout as logoutApi } from '@/client/services';
import { useUserStore } from '@/stores';

export function useLogout() {
  const router = useRouter();
  const { logout: logoutStore } = useUserStore();

  const logout = async () => {
    try {
      await logoutApi();
      logoutStore();
      message.success('退出成功');
      router.push('/login');
    } catch (error) {
      message.error('退出失败');
    }
  };

  return { logout };
}

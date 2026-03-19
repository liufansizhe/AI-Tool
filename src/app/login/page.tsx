'use client';

import { Card, Form, Input, Button, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { login } from '@/client/services';
import { useUserStore } from '@/stores';
import { useI18n } from '@/client/components/i18n-provider';
import styles from '@/styles/pages/login.module.scss';

const { Title } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setToken } = useUserStore();
  const { t } = useI18n();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      const result = await login(values);
      setToken(result.token);
      setUser(result.user);
      message.success(t('login.success'));
      router.push('/');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('login.error');
      message.error(errorMessage);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        {/* 关闭按钮 */}
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => router.push('/')}
          style={{ position: 'absolute', top: 16, right: 16 }}
        />

        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          {t('login.title')}
        </Title>

        <Form
          form={form}
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder={t('login.username')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder={t('login.password')}
            />
          </Form.Item>

          {/* 忘记密码链接 */}
          <div style={{ textAlign: 'right', marginBottom: 16 }}>
            <Link href="/forgot-password" style={{ fontSize: 14 }}>
              忘记密码？
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<LoginOutlined />}
              block
            >
              {t('login.submit')}
            </Button>
          </Form.Item>
        </Form>

        {/* 注册入口 */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Space>
            <span style={{ color: '#999' }}>还没有账号？</span>
            <Link href="/register">立即注册</Link>
          </Space>
        </div>

        <div style={{ textAlign: 'center', color: '#999', fontSize: 12, marginTop: 24 }}>
          <p>测试账号: admin / 123456</p>
        </div>
      </Card>
    </div>
  );
}

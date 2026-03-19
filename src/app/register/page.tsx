'use client';

import { Card, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/client/services';
import { useUserStore } from '@/stores';
import styles from '@/styles/pages/login.module.scss';

const { Title } = Typography;

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setToken } = useUserStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: RegisterForm) => {
    try {
      const result = await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      setToken(result.token);
      setUser(result.user);
      message.success('注册成功！');
      router.push('/');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '注册失败';
      message.error(errorMessage);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回登录
        </Link>

        <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
          用户注册
        </Title>

        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3个字符' },
              { max: 20, message: '用户名最多20个字符' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            >
              注册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <span>已有账号？</span>
            <Link href="/login">立即登录</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

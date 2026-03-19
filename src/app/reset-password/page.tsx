'use client';

import { Card, Form, Input, Button, Typography, message, Alert, Spin } from 'antd';
import { LockOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { resetPassword, validateResetToken } from '@/client/services';
import styles from '@/styles/pages/login.module.scss';

const { Title } = Typography;

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [form] = Form.useForm();
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setValidating(false);
      return;
    }

    validateResetToken(token)
      .then((result) => {
        setTokenValid(result.valid);
        if (result.valid && result.username) {
          setUsername(result.username);
        }
      })
      .catch(() => {
        setTokenValid(false);
      })
      .finally(() => {
        setValidating(false);
      });
  }, [token]);

  const handleSubmit = async (values: ResetPasswordForm) => {
    if (!token) return;

    if (!username) {
      message.error('无法获取用户信息，请重新申请重置链接');
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, password: values.password }, username);
      setSubmitted(true);
      message.success('密码重置成功');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '重置失败';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard} style={{ textAlign: 'center' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>验证链接中...</p>
        </Card>
      </div>
    );
  }

  if (!token || !tokenValid) {
    return (
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <Alert
            message="链接无效或已过期"
            description="该密码重置链接已失效，请重新申请。"
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => router.push('/forgot-password')}>
              重新申请
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard}>
          <Alert
            message="密码重置成功"
            description="您的密码已重置，请使用新密码登录。"
            type="success"
            showIcon
            style={{ marginBottom: 24 }}
          />
          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={() => router.push('/login')}>
              前往登录
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回登录
        </Link>

        <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
          重置密码
        </Title>

        <Form
          form={form}
          name="resetPassword"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入新密码' },
              { min: 6, message: '密码至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="新密码"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认新密码' },
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
              placeholder="确认新密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              重置密码
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className={styles.loginContainer}>
        <Card className={styles.loginCard} style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </Card>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}

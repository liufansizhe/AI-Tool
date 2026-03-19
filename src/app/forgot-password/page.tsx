'use client';

import { Card, Form, Input, Button, Typography, message, Alert } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { forgotPassword } from '@/client/services';
import styles from '@/styles/pages/login.module.scss';

const { Title, Paragraph } = Typography;

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ForgotPasswordForm) => {
    setLoading(true);
    try {
      await forgotPassword({ email: values.email });
      setSubmitted(true);
      message.success('重置邮件已发送，请检查邮箱');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '发送失败';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Card className={styles.loginCard}>
        <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16 }}>
          <ArrowLeftOutlined /> 返回登录
        </Link>

        <Title level={3} style={{ textAlign: 'center', marginBottom: 16 }}>
          忘记密码
        </Title>

        {submitted ? (
          <>
            <Alert
              message="邮件已发送"
              description={
                <>
                  <p>如果该邮箱存在，我们已发送密码重置链接到您的邮箱。</p>
                  <p>请检查收件箱（包括垃圾邮件）。</p>
                </>
              }
              type="success"
              showIcon
              style={{ marginBottom: 24 }}
            />
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={() => router.push('/login')}>
                返回登录
              </Button>
            </div>
          </>
        ) : (
          <>
            <Paragraph type="secondary" style={{ marginBottom: 24 }}>
              请输入您的注册邮箱，我们将发送密码重置链接给您。
            </Paragraph>

            <Form
              form={form}
              name="forgotPassword"
              onFinish={handleSubmit}
              autoComplete="off"
              size="large"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: '请输入邮箱' },
                  { type: 'email', message: '请输入有效的邮箱地址' },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="注册邮箱"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                >
                  发送重置链接
                </Button>
              </Form.Item>

              <div style={{ textAlign: 'center' }}>
                <span>想起密码了？</span>
                <Link href="/login">立即登录</Link>
              </div>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
}

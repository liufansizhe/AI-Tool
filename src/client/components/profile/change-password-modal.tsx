"use client";

import { Button, Form, Input, Modal, message } from "antd";

import { LockOutlined } from "@ant-design/icons";
import { changePassword } from "@/client/services";
import { useState } from "react";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

interface ChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function ChangePasswordModal({
  open,
  onClose,
  username,
}: ChangePasswordModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ChangePasswordForm) => {
    setLoading(true);
    try {
      await changePassword(
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        username,
      );
      message.success("密码修改成功");
      form.resetFields();
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "修改失败";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title='修改密码'
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        name='changePassword'
        onFinish={handleSubmit}
        layout='vertical'
        autoComplete='off'
      >
        <Form.Item
          label='当前密码'
          name='oldPassword'
          rules={[{ required: true, message: "请输入当前密码" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='当前密码' />
        </Form.Item>

        <Form.Item
          label='新密码'
          name='newPassword'
          rules={[
            { required: true, message: "请输入新密码" },
            { min: 6, message: "密码至少6个字符" },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='新密码' />
        </Form.Item>

        <Form.Item
          label='确认新密码'
          name='confirmPassword'
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "请确认新密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder='确认新密码' />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button type='primary' htmlType='submit' loading={loading}>
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

import nodemailer from 'nodemailer';
import { config } from '@/config/env';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * 邮件服务
 * 用于发送密码重置邮件、验证邮件等
 */
class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    // 如果配置了邮件服务，创建 transporter
    if (config.email.auth.user) {
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: {
          user: config.email.auth.user,
          pass: config.email.auth.pass,
        },
      });
    }
  }

  /**
   * 发送邮件
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    // 开发环境：只在控制台输出邮件内容
    if (config.isDev || !this.transporter) {
      console.log('========== 邮件发送（开发模式）==========');
      console.log('收件人:', options.to);
      console.log('主题:', options.subject);
      console.log('内容:', options.html);
      console.log('=======================================');
      return;
    }

    // 生产环境：实际发送邮件
    try {
      await this.transporter.sendMail({
        from: config.email.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      });
    } catch (error) {
      console.error('邮件发送失败:', error);
      throw new Error('邮件发送失败');
    }
  }

  /**
   * 发送密码重置邮件
   */
  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${config.client.apiUrl.replace('/api', '')}/reset-password?token=${resetToken}`;

    await this.sendEmail({
      to: email,
      subject: '密码重置请求',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1677ff;">密码重置</h2>
          <p>您收到这封邮件是因为有人请求重置您账户的密码。</p>
          <p>请点击下面的链接重置密码（链接1小时内有效）：</p>
          <a
            href="${resetUrl}"
            style="display: inline-block; padding: 12px 24px; background: #1677ff; color: white; text-decoration: none; border-radius: 4px;"
          >
            重置密码
          </a>
          <p style="margin-top: 24px; color: #666;">
            如果无法点击链接，请复制以下地址到浏览器：<br/>
            <code>${resetUrl}</code>
          </p>
          <p style="color: #999; font-size: 12px;">
            如果您没有请求重置密码，请忽略此邮件。
          </p>
        </div>
      `,
      text: `密码重置链接：${resetUrl}`,
    });
  }

  /**
   * 发送验证码邮件（用于注册验证）
   */
  async sendVerificationEmail(email: string, code: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: '邮箱验证码',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1677ff;">邮箱验证</h2>
          <p>您的验证码是：</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px; background: #f0f0f0; border-radius: 4px; text-align: center;">
            ${code}
          </div>
          <p style="color: #666;">验证码10分钟内有效，请勿泄露给他人。</p>
        </div>
      `,
      text: `您的验证码是：${code}，10分钟内有效。`,
    });
  }
}

// 导出单例
export const emailService = new EmailService();

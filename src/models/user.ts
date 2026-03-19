import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, '用户名不能为空'],
      unique: true,
      trim: true,
      minlength: [3, '用户名至少3个字符'],
      maxlength: [20, '用户名最多20个字符'],
    },
    email: {
      type: String,
      required: [true, '邮箱不能为空'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, '密码不能为空'],
      minlength: [6, '密码至少6个字符'],
      select: false, // 默认查询不返回密码
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete (ret as { password?: string }).password;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        delete (ret as { __v?: number }).__v;
        return ret;
      },
    },
  }
);

// 密码加密中间件
// eslint-disable-next-line @typescript-eslint/no-explicit-any
UserSchema.pre<IUser>('save', async function (next: any) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password!, salt);
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

// 密码比对方法
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 如果模型已存在则使用，否则创建新模型
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

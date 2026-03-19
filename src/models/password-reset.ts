import mongoose, { Schema, Document } from 'mongoose';

export interface IPasswordReset extends Document {
  email: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

const PasswordResetSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 60 * 60 * 1000), // 1小时后过期
  },
  used: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24小时后自动删除文档
  },
});

// 索引：自动清理过期文档
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordReset = mongoose.models.PasswordReset ||
  mongoose.model<IPasswordReset>('PasswordReset', PasswordResetSchema);

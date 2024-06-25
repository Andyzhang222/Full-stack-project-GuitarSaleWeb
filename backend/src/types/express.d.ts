import { User } from '../models/user'; // 假设您有一个用户模型

declare global {
  namespace Express {
    interface Request {
      user?: User; // 或者根据实际类型定义
    }
  }
}
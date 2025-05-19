export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  role: string;
  email: string;
  username: string;
  avatarUrl?: string;
  publicId?: string;
  createdAt: Date;
  updatedAt?: Date;
  password?: string;
}

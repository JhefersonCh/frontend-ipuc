import { User } from '../../shared/interfaces/user.interface';

export interface Comment {
  id?: string;
  userId: string;
  postId: string;
  content: string;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface CreateComment {
  content: string;
  postId: string;
  parentId?: string | null;
}

export interface Reply {
  id: string;
  userId: string;
  postId: string;
  content: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

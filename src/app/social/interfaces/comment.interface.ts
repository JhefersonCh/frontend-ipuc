import { User } from '../../shared/interfaces/user.interface';

export interface Comment {
  id?: string;
  userId: string;
  postId: string;
  content: string;
  parentId?: string | null;
  createdAt: string;
  updatedAt: string;
  user: User;
  replies?: Comment[];
}

export interface CreateComment {
  content: string;
  postId: string;
  parentId?: string | null;
}

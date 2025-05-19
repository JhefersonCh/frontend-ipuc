import { User } from '../../shared/interfaces/user.interface';
import { Comment } from '../../social/interfaces/comment.interface';

export interface StatisticsInterface {
  lastPosts: LastPost[];
  lastComments: LastComments;
  comments: Comments;
  likes: Likes;
  posts: Posts;
}

export interface LastComments {
  replies: Comment[];
  topLevelComments: Comment[];
}

export interface Comments {
  total: number;
}

export interface Likes {
  total: number;
}

export interface Posts {
  total: number;
}

export interface LastPost {
  id: string;
  title: string;
  description: string;
  commentsCount: number;
  likesCount: number;
  hasLiked: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ChangePassword {
  oldPassword?: string;
  newPassword: string;
  confirmNewPassword: string;
  userId?: string;
  resetToken?: string;
}

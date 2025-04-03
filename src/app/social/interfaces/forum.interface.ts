export interface Post {
  id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  commentsCount?: number;
  likesCount?: number;
  hasLiked?: boolean;
  userId?: string;
}

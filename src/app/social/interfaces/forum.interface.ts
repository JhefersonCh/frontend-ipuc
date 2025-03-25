export interface Post {
  id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  commentscount?: number;
  likescount?: number;
  hasLiked?: boolean;
}

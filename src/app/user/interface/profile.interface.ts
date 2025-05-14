export interface StatisticsInterface {
  comments: Comments;
  likes: Likes;
  posts: Posts;
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

export interface ChangePassword {
  oldPassword?: string;
  newPassword: string;
  confirmNewPassword: string;
  userId?: string;
  resetToken?: string;
}

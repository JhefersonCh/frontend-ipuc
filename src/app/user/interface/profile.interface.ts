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

export interface Activity {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  publicId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventInterface {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  publicId?: string;
  createdAt?: string;
  updatedAt?: string;
  date?: Date;
  activityId?: string;
}

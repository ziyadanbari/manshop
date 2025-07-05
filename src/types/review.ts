export interface ReviewWithUser {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name?: string | null;
    username?: string | null;
  };
}

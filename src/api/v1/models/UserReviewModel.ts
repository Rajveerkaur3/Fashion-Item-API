export interface UserReview {
    id: string;
    fashionItemId: string;
    userName: string;
    comment: string;
    rating: string;      // Still represents 1 to 5, but stored as a string
    createdAt: string;   // ISO date as string
  }
  
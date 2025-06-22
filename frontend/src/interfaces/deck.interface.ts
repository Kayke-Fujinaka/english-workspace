export interface Deck {
    id: string;
    name: string;
    stats: {
      new: number;
      review: number;
    };
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  }
export interface Card {
  id: string;
  front: string;
  back: string;
  deckId: string;
  reviewCount: number;
  correctStreak: number;
  totalErrors: number;
  consecutiveErrors: number;
  currentStage: number;
  nextReviewAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
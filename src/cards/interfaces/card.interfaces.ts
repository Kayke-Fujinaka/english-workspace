import { Card } from '../entities/card.entity';

export interface CardSingleResponse {
  card: Card;
}

export interface CardMultipleResponse {
  cards: Card[];
}

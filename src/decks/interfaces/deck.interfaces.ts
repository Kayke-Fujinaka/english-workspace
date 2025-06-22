import { Deck } from '../entities/deck.entity';

export interface DeckSingleResponse {
  deck: Deck;
}

export interface DeckMultipleResponse {
  decks: Deck[];
}

export interface DeckStats {
  new: number;
  review: number;
}

export interface DeckWithStats extends Deck {
  stats: DeckStats;
}

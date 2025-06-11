import { Deck } from '../entities/deck.entity';

export interface DeckSingleResponse {
  deck: Deck;
}

export interface DeckMultipleResponse {
  decks: Deck[];
}

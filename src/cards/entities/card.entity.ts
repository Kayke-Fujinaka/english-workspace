import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Deck } from '../../decks/entities/deck.entity';

@Entity('tb_cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  front: string;

  @Column()
  back: string;

  @Column()
  deckId: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  deck?: Deck;
}

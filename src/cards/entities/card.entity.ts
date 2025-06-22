import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Deck } from '../../decks/entities/deck.entity';

@Entity('tb_cards')
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  front: string;

  @Column()
  back: string;

  @Column({ name: 'deck_id' })
  deckId: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  @JoinColumn({ name: 'deck_id' })
  deck?: Deck;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

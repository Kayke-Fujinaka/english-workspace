import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @Column()
  deckId: string;

  @ManyToOne(() => Deck, (deck) => deck.cards)
  deck?: Deck;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

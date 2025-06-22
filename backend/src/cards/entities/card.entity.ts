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

  @Column({ name: 'review_count', default: 0 })
  reviewCount: number;

  @Column({ name: 'correct_streak', default: 0 })
  correctStreak: number;

  @Column({ name: 'total_errors', default: 0 })
  totalErrors: number;

  @Column({ name: 'consecutive_errors', default: 0 })
  consecutiveErrors: number;

  @Column({ name: 'current_stage', default: 0 })
  currentStage: number;

  @Column({ name: 'next_review_at', default: new Date() })
  nextReviewAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

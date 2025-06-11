import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Card } from '../../cards/entities/card.entity';

@Entity('tb_decks')
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Card, (card) => card.deck)
  cards: Pick<Card, 'id' | 'front' | 'back'>[];
}

import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DecksService } from '../decks/decks.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  private readonly cards: Card[] = [];

  constructor(
    @Inject(forwardRef(() => DecksService))
    private readonly decksService: DecksService,
  ) {}

  create({ deckId, front, back }: CreateCardDto): Card {
    const deck = this.decksService.findOne(deckId);

    const card = { id: uuidv4(), deckId: deck.id, front, back };
    this.cards.push(card);
    return card;
  }

  findAll(): Card[] {
    return this.cards;
  }

  findByDeckId(deckId: string): Pick<Card, 'id' | 'front' | 'back'>[] {
    const cards = this.cards.filter((card) => card.deckId === deckId);
    return cards.map(({ id, front, back }) => ({ id, front, back }));
  }

  findOne(id: string): Card {
    const card = this.cards.find((card) => card.id === id);
    if (!card) throw new NotFoundException('Card não encontrado');
    return card;
  }

  update(id: string, updateCardDto: UpdateCardDto): Card {
    const card = this.findOne(id);

    const hasNoChanges =
      (!updateCardDto.front || updateCardDto.front === card.front) &&
      (!updateCardDto.back || updateCardDto.back === card.back) &&
      (!updateCardDto.deckId || updateCardDto.deckId === card.deckId);
    if (hasNoChanges) return card;

    if (updateCardDto.deckId && updateCardDto.deckId !== card.deckId) {
      this.decksService.findOne(updateCardDto.deckId);
    }

    const updatedCard = { ...card, ...updateCardDto };
    const index = this.cards.indexOf(card);
    this.cards[index] = updatedCard;

    return updatedCard;
  }

  remove(id: string): void {
    const card = this.findOne(id);
    const index = this.cards.indexOf(card);
    this.cards.splice(index, 1);
  }
}

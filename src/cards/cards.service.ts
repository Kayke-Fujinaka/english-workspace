import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DecksService } from '../decks/decks.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import {
  CardMultipleResponse,
  CardSingleResponse,
} from './interfaces/card.interfaces';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
    private readonly decksService: DecksService,
  ) {}

  async create(
    deckId: string,
    { front, back }: CreateCardDto,
  ): Promise<CardSingleResponse> {
    await this.decksService.findOne(deckId);

    const card = this.cardsRepository.create({ deckId, front, back });
    await this.cardsRepository.save(card);
    return { card };
  }

  async findAll(): Promise<CardMultipleResponse> {
    const cards = await this.cardsRepository.find();
    return { cards };
  }

  async findOne(id: string): Promise<CardSingleResponse> {
    const card = await this.cardsRepository.findOne({ where: { id } });
    if (!card) throw new NotFoundException('Card not found');
    return { card };
  }

  async update(
    id: string,
    deckId: string,
    updateCardDto: UpdateCardDto,
  ): Promise<CardSingleResponse> {
    const { card } = await this.findOne(id);

    const isDeckChanged = deckId && deckId !== card.deckId;
    if (isDeckChanged) await this.decksService.findOne(deckId);

    this.cardsRepository.merge(card, updateCardDto);
    await this.cardsRepository.save(card);
    return { card };
  }

  async remove(id: string): Promise<void> {
    const { card } = await this.findOne(id);
    await this.cardsRepository.softDelete(card.id);
  }
}

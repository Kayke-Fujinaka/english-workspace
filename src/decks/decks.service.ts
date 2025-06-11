import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';
import {
  DeckMultipleResponse,
  DeckSingleResponse,
} from './interfaces/deck.interfaces';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly decksRepository: Repository<Deck>,
  ) {}

  async create(createDeckDto: CreateDeckDto): Promise<DeckSingleResponse> {
    const deck = this.decksRepository.create(createDeckDto);
    await this.decksRepository.save(deck);
    return { deck };
  }

  async findAll(): Promise<DeckMultipleResponse> {
    const decks = await this.decksRepository.find({
      relations: ['cards'],
    });
    return { decks };
  }

  async findOne(id: string): Promise<DeckSingleResponse> {
    const deck = await this.decksRepository.findOne({
      where: { id },
      relations: ['cards'],
    });
    if (!deck) throw new NotFoundException('Deck not found');
    return { deck };
  }

  async update(
    id: string,
    updateDeckDto: UpdateDeckDto,
  ): Promise<DeckSingleResponse> {
    const { deck } = await this.findOne(id);
    this.decksRepository.merge(deck, updateDeckDto);
    await this.decksRepository.save(deck);
    return { deck };
  }

  async remove(id: string): Promise<void> {
    const { deck } = await this.findOne(id);
    await this.decksRepository.softDelete(deck.id);
  }
}

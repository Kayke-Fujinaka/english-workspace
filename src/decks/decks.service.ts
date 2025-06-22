import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CardsService } from '../cards/cards.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';
import {
  DeckSingleResponse,
  DeckWithStats,
} from './interfaces/deck.interfaces';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly decksRepository: Repository<Deck>,
    @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
  ) {}

  async create(createDeckDto: CreateDeckDto): Promise<DeckSingleResponse> {
    const deck = this.decksRepository.create(createDeckDto);
    await this.decksRepository.save(deck);
    return { deck };
  }

  async findAll(): Promise<{ decks: DeckWithStats[] }> {
    const decks = await this.decksRepository.find();

    const decksWithStats = await Promise.all(
      decks.map(async (deck) => {
        const stats = await this.cardsService.getReviewStats(deck.id);
        return { ...deck, stats };
      }),
    );

    return { decks: decksWithStats };
  }

  async findOne(id: string): Promise<{ deck: DeckWithStats }> {
    const deck = await this.decksRepository.findOne({
      where: { id },
    });
    if (!deck) throw new NotFoundException('Deck not found');

    const stats = await this.cardsService.getReviewStats(id);
    return { deck: { ...deck, stats } };
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

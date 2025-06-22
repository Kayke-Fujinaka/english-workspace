import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, Or, Repository } from 'typeorm';

import { DecksService } from '../decks/decks.service';
import { REVIEW_INTERVALS, REVIEW_STAGE } from './constants/review.constants';
import { CreateCardDto } from './dto/create-card.dto';
import { ReviewCardDto } from './dto/review-card.dto';
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
    @Inject(forwardRef(() => DecksService))
    private readonly decksService: DecksService,
  ) {}

  async create(
    deckId: string,
    { front, back }: CreateCardDto,
  ): Promise<CardSingleResponse> {
    await this.decksService.findOne(deckId);

    const card = this.cardsRepository.create({
      deckId,
      front,
      back,
    });
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

  async listCardsForReview(deckId?: string): Promise<CardMultipleResponse> {
    const whereCondition = {
      ...(deckId && { deckId }),
      nextReviewAt: Or(LessThanOrEqual(new Date()), IsNull()),
    };

    const cards = await this.cardsRepository.find({
      where: whereCondition,
      relations: ['deck'],
      order: { nextReviewAt: 'ASC' },
    });

    return { cards };
  }

  async getReviewStats(
    deckId: string,
  ): Promise<{ new: number; review: number }> {
    const newCards = await this.cardsRepository
      .createQueryBuilder('card')
      .where('card.deckId = :deckId', { deckId })
      .andWhere('card.reviewCount = 0')
      .getCount();

    const reviewCards = await this.cardsRepository
      .createQueryBuilder('card')
      .where('card.deckId = :deckId', { deckId })
      .andWhere('card.reviewCount > 0')
      .andWhere('(card.nextReviewAt IS NULL OR card.nextReviewAt <= :now)', {
        now: new Date(),
      })
      .getCount();

    return {
      new: newCards,
      review: reviewCards,
    };
  }

  async reviewCard(
    id: string,
    { isCorrect }: ReviewCardDto,
  ): Promise<CardSingleResponse> {
    const { card } = await this.findOne(id);

    const isAvailableForReview =
      !card.nextReviewAt || card.nextReviewAt <= new Date();
    if (!isAvailableForReview) {
      throw new BadRequestException('Card is not available for review yet');
    }

    card.reviewCount += 1;

    if (isCorrect) this.handleCorrectAnswer(card);
    else this.handleIncorrectAnswer(card);

    this.scheduleNextReview(card);
    await this.cardsRepository.save(card);
    return { card };
  }

  private handleCorrectAnswer(card: Card): void {
    card.correctStreak += 1;
    card.consecutiveErrors = 0;

    const maxStageIndex = REVIEW_INTERVALS.length - 1;
    const isLastStage = card.currentStage >= maxStageIndex;
    if (isLastStage) return;

    card.currentStage += 1;
  }

  private handleIncorrectAnswer(card: Card): void {
    card.totalErrors += 1;
    card.consecutiveErrors += 1;
    card.correctStreak = 0;

    const isFirstReview = card.reviewCount === 1;
    if (isFirstReview) {
      card.currentStage = REVIEW_STAGE.FIRST_WRONG;
      return;
    }

    const stageReduction =
      REVIEW_STAGE.STAGE_REDUCTION_BASE +
      Math.max(0, card.consecutiveErrors - 1);
    const newStage = card.currentStage - stageReduction;
    card.currentStage = Math.max(REVIEW_STAGE.MIN_STAGE_AFTER_WRONG, newStage);
  }

  private scheduleNextReview(card: Card): void {
    const intervalMinutes = REVIEW_INTERVALS[card.currentStage];
    card.nextReviewAt = new Date(Date.now() + intervalMinutes * 60 * 1000);
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

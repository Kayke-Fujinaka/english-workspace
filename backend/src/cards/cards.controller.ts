import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { ReviewCardDto } from './dto/review-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import {
  CardMultipleResponse,
  CardSingleResponse,
} from './interfaces/card.interfaces';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post(':deckId')
  @ApiOperation({ summary: 'Create a card' })
  @ApiCreatedResponse({ description: 'Create a card', type: Card })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('deckId') deckId: string,
    @Body() createCardDto: CreateCardDto,
  ): Promise<CardSingleResponse> {
    return this.cardsService.create(deckId, createCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiOkResponse({ description: 'Get all cards', type: [Card] })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<CardMultipleResponse> {
    return this.cardsService.findAll();
  }

  @Get('review')
  @ApiOperation({ summary: 'Get cards available for review' })
  @ApiOkResponse({
    description: 'Get cards available for review',
    type: [Card],
  })
  @ApiQuery({
    name: 'deckId',
    required: true,
    description: 'Filter by deck ID',
  })
  @HttpCode(HttpStatus.OK)
  async findCardsForReview(
    @Query('deckId') deckId: string,
  ): Promise<CardMultipleResponse> {
    return this.cardsService.listCardsForReview(deckId);
  }

  @Post(':id/review')
  @ApiOperation({ summary: 'Review a card (correct or incorrect)' })
  @ApiOkResponse({ description: 'Card reviewed successfully', type: Card })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.OK)
  async reviewCard(
    @Param('id') id: string,
    @Body() reviewCardDto: ReviewCardDto,
  ): Promise<CardSingleResponse> {
    return this.cardsService.reviewCard(id, reviewCardDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by id' })
  @ApiOkResponse({ description: 'Get a card by id', type: Card })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<CardSingleResponse> {
    return this.cardsService.findOne(id);
  }

  @Patch(':id/:deckId')
  @ApiOperation({ summary: 'Update a card by id' })
  @ApiOkResponse({ description: 'Update a card by id', type: Card })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Param('deckId') deckId: string,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<CardSingleResponse> {
    return this.cardsService.update(id, deckId, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card by id' })
  @ApiNoContentResponse({ description: 'Delete a card by id' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.cardsService.remove(id);
  }
}

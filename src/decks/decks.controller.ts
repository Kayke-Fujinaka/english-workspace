import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CardsService } from '../cards/cards.service';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';

@ApiTags('decks')
@Controller('decks')
export class DecksController {
  constructor(
    private readonly decksService: DecksService,
    @Inject(forwardRef(() => CardsService))
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a deck' })
  @ApiCreatedResponse({ description: 'Create a deck', type: Deck })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDeckDto: CreateDeckDto): Deck {
    return this.decksService.create(createDeckDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all decks' })
  @ApiOkResponse({ description: 'Get all decks', type: [Deck] })
  @HttpCode(HttpStatus.OK)
  findAll(): Deck[] {
    const decks = this.decksService.findAll();

    return decks.map((deck) => ({
      ...deck,
      cards: this.cardsService.findByDeckId(deck.id),
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a deck by id' })
  @ApiOkResponse({ description: 'Get a deck by id', type: Deck })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Deck {
    const deck = this.decksService.findOne(id);

    return {
      ...deck,
      cards: this.cardsService.findByDeckId(deck.id),
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deck by id' })
  @ApiOkResponse({ description: 'Update a deck by id', type: Deck })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto): Deck {
    return this.decksService.update(id, updateDeckDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deck by id' })
  @ApiNoContentResponse({ description: 'Delete a deck by id' })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.decksService.findOne(id);
    const deckCards = this.cardsService.findByDeckId(id);
    deckCards.forEach((card) => this.cardsService.remove(card.id));
    this.decksService.remove(id);
  }
}

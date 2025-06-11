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
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a card' })
  @ApiCreatedResponse({ description: 'Create a card', type: Card })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cards' })
  @ApiOkResponse({ description: 'Get all cards', type: [Card] })
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by id' })
  @ApiOkResponse({ description: 'Get a card by id', type: Card })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a card by id' })
  @ApiOkResponse({ description: 'Update a card by id', type: Card })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card by id' })
  @ApiNoContentResponse({ description: 'Delete a card by id' })
  @ApiNotFoundResponse({ description: 'Card not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}

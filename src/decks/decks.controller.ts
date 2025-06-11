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

import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';
import {
  DeckMultipleResponse,
  DeckSingleResponse,
} from './interfaces/deck.interfaces';

@ApiTags('decks')
@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a deck' })
  @ApiCreatedResponse({ description: 'Create a deck', type: Deck })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDeckDto: CreateDeckDto,
  ): Promise<DeckSingleResponse> {
    return this.decksService.create(createDeckDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all decks' })
  @ApiOkResponse({ description: 'Get all decks', type: [Deck] })
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<DeckMultipleResponse> {
    return this.decksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a deck by id' })
  @ApiOkResponse({ description: 'Get a deck by id', type: Deck })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<DeckSingleResponse> {
    return this.decksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deck by id' })
  @ApiOkResponse({ description: 'Update a deck by id', type: Deck })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ): Promise<DeckSingleResponse> {
    return this.decksService.update(id, updateDeckDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a deck by id' })
  @ApiNoContentResponse({ description: 'Delete a deck by id' })
  @ApiNotFoundResponse({ description: 'Deck not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.decksService.remove(id);
  }
}

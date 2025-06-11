import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';

@Injectable()
export class DecksService {
  private readonly decks: Deck[] = [];

  create(createDeckDto: CreateDeckDto): Deck {
    const deck = { id: uuidv4(), ...createDeckDto, cards: [] };
    this.decks.push(deck);
    return deck;
  }

  findAll(): Deck[] {
    return this.decks;
  }

  findOne(id: string): Deck {
    const deck = this.decks.find((deck) => deck.id === id);
    if (!deck) throw new NotFoundException('Deck not found');
    return deck;
  }

  update(id: string, updateDeckDto: UpdateDeckDto): Deck {
    const deck = this.findOne(id);

    const hasUpdated = updateDeckDto.name === deck.name;
    if (hasUpdated) return deck;

    const updatedDeck = { ...deck, ...updateDeckDto };
    const index = this.decks.indexOf(deck);
    this.decks[index] = updatedDeck;

    return updatedDeck;
  }

  remove(id: string): void {
    const deck = this.findOne(id);
    const index = this.decks.indexOf(deck);
    this.decks.splice(index, 1);
  }
}

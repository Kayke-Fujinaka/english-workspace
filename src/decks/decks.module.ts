import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { Deck } from './entities/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deck])],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService, TypeOrmModule],
})
export class DecksModule {}

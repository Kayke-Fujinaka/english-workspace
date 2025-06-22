import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';
import { Deck } from './entities/deck.entity';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Deck]), forwardRef(() => CardsModule)],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService, TypeOrmModule],
})
export class DecksModule {}

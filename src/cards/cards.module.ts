import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DecksModule } from '../decks/decks.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), DecksModule],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService, TypeOrmModule],
})
export class CardsModule {}

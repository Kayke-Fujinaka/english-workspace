import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CardsModule } from './cards/cards.module';
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [DecksModule, CardsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

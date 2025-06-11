import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { CardsModule } from './cards/cards.module';
import { databaseConfig } from './config/database.config';
import { DecksModule } from './decks/decks.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), DecksModule, CardsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

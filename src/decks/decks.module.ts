import { forwardRef, Module } from '@nestjs/common';

import { CardsModule } from '../cards/cards.module';
import { DecksController } from './decks.controller';
import { DecksService } from './decks.service';

@Module({
  imports: [forwardRef(() => CardsModule)],
  controllers: [DecksController],
  providers: [DecksService],
  exports: [DecksService],
})
export class DecksModule {}

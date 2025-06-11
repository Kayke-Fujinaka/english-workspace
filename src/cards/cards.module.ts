import { forwardRef, Module } from '@nestjs/common';

import { DecksModule } from '../decks/decks.module';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [forwardRef(() => DecksModule)],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [CardsService],
})
export class CardsModule {}

import { Test } from '@nestjs/testing';

import { DecksController } from '../../src/decks/decks.controller';
import { DecksModule } from '../../src/decks/decks.module';
import { DecksService } from '../../src/decks/decks.service';

describe('DecksModule', () => {
  it('should be able to compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [DecksModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(DecksService)).toBeInstanceOf(DecksService);
    expect(module.get(DecksController)).toBeInstanceOf(DecksController);
  });
}); 
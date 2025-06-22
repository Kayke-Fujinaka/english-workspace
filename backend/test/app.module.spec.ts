import { Test } from '@nestjs/testing';

import { AppController } from '../src/app.controller';
import { AppModule } from '../src/app.module';

describe('AppModule', () => {
  it('should be able to compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(AppController)).toBeInstanceOf(AppController);
  });
}); 
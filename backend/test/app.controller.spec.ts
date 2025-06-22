import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from '../src/app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('health', () => {
    it('should be able to return health status', () => {
      const result = controller.health();

      expect(result).toEqual({
        statusCode: 200,
        message: 'OK',
      });
    });
  });
});

import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { DecksController } from '../../src/decks/decks.controller';
import { DecksService } from '../../src/decks/decks.service';
import { CreateDeckDto } from '../../src/decks/dto/create-deck.dto';
import { UpdateDeckDto } from '../../src/decks/dto/update-deck.dto';
import { Deck } from '../../src/decks/entities/deck.entity';

describe('DecksController', () => {
  let controller: DecksController;

  const mockDeck: Deck = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Test Deck',
  };

  const mockDecksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DecksController],
      providers: [
        {
          provide: DecksService,
          useValue: mockDecksService,
        },
      ],
    }).compile();

    controller = module.get<DecksController>(DecksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a deck', () => {
      const createDeckDto: CreateDeckDto = { name: 'Test Deck' };
      mockDecksService.create.mockReturnValue(mockDeck);

      const result = controller.create(createDeckDto);

      expect(result).toEqual(mockDeck);
      expect(mockDecksService.create).toHaveBeenCalledWith(createDeckDto);
    });
  });

  describe('findAll', () => {
    it('should be able to return an array of decks', () => {
      mockDecksService.findAll.mockReturnValue([mockDeck]);

      const result = controller.findAll();

      expect(result).toEqual([mockDeck]);
      expect(mockDecksService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should be able to return a single deck', () => {
      mockDecksService.findOne.mockReturnValue(mockDeck);

      const result = controller.findOne(mockDeck.id);

      expect(result).toEqual(mockDeck);
      expect(mockDecksService.findOne).toHaveBeenCalledWith(mockDeck.id);
    });

    it('should throw an exception if deck is not found', () => {
      mockDecksService.findOne.mockImplementation(() => {
        throw new NotFoundException('Deck not found');
      });

      expect(() => controller.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
      expect(mockDecksService.findOne).toHaveBeenCalledWith('non-existent-id');
    });
  });

  describe('update', () => {
    it('should be able to update a deck', () => {
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Deck' };
      const updatedDeck = { ...mockDeck, ...updateDeckDto };
      mockDecksService.update.mockReturnValue(updatedDeck);

      const result = controller.update(mockDeck.id, updateDeckDto);

      expect(result).toEqual(updatedDeck);
      expect(mockDecksService.update).toHaveBeenCalledWith(
        mockDeck.id,
        updateDeckDto,
      );
    });

    it('should throw an exception if deck is not found', () => {
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Deck' };
      mockDecksService.update.mockImplementation(() => {
        throw new NotFoundException('Deck not found');
      });

      expect(() => controller.update('non-existent-id', updateDeckDto)).toThrow(
        NotFoundException,
      );
      expect(mockDecksService.update).toHaveBeenCalledWith(
        'non-existent-id',
        updateDeckDto,
      );
    });
  });

  describe('remove', () => {
    it('should be able to remove a deck', () => {
      mockDecksService.remove.mockReturnValue(undefined);

      expect(controller.remove(mockDeck.id)).toBeUndefined();
      expect(mockDecksService.remove).toHaveBeenCalledWith(mockDeck.id);
    });

    it('should throw an exception if deck is not found', () => {
      mockDecksService.remove.mockImplementation(() => {
        throw new NotFoundException('Deck not found');
      });

      expect(() => controller.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
      expect(mockDecksService.remove).toHaveBeenCalledWith('non-existent-id');
    });
  });
}); 
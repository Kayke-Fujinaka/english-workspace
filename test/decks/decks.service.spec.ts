import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { v4 as uuidv4 } from 'uuid';

import { DecksService } from '../../src/decks/decks.service';
import { CreateDeckDto } from '../../src/decks/dto/create-deck.dto';
import { UpdateDeckDto } from '../../src/decks/dto/update-deck.dto';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('DecksService', () => {
  let service: DecksService;
  const mockUuid = '123e4567-e89b-12d3-a456-426614174000';

  beforeEach(async () => {
    jest.clearAllMocks();
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

    const module: TestingModule = await Test.createTestingModule({
      providers: [DecksService],
    }).compile();

    service = module.get<DecksService>(DecksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a deck', () => {
      const createDeckDto: CreateDeckDto = { name: 'Test Deck' };

      const result = service.create(createDeckDto);

      expect(result).toEqual({
        id: mockUuid,
        ...createDeckDto,
      });
      expect(service.findAll()).toHaveLength(1);
      expect(uuidv4).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should be able to return an empty array when no decks exist', () => {
      const result = service.findAll();
      expect(result).toEqual([]);
    });

    it('should be able to return all decks', () => {
      const createDeckDto: CreateDeckDto = { name: 'Test Deck' };
      service.create(createDeckDto);

      const result = service.findAll();

      expect(result).toEqual([
        {
          id: mockUuid,
          ...createDeckDto,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should be able to return a deck if it exists', () => {
      const createDeckDto: CreateDeckDto = { name: 'Test Deck' };
      service.create(createDeckDto);

      const result = service.findOne(mockUuid);

      expect(result).toEqual({
        id: mockUuid,
        ...createDeckDto,
      });
    });

    it('should throw NotFoundException if deck does not exist', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should be able to update a deck if it exists and name changes', () => {
      const createDeckDto: CreateDeckDto = { name: 'Test Deck' };
      service.create(createDeckDto);
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Deck' };

      const result = service.update(mockUuid, updateDeckDto);

      expect(result).toEqual({
        id: mockUuid,
        ...updateDeckDto,
      });
      expect(service.findOne(mockUuid).name).toBe('Updated Deck');
    });

    it('should be able to return the deck without updating if name is the same', () => {
      const name = 'Test Deck';
      const createDeckDto: CreateDeckDto = { name };
      service.create(createDeckDto);
      const updateDeckDto: UpdateDeckDto = { name };

      const result = service.update(mockUuid, updateDeckDto);

      expect(result).toEqual({
        id: mockUuid,
        ...createDeckDto,
      });
    });

    it('should throw NotFoundException if deck does not exist', () => {
      const updateDeckDto: UpdateDeckDto = { name: 'Updated Deck' };

      expect(() => service.update('non-existent-id', updateDeckDto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should be able to remove a deck if it exists', () => {
      const createDeckDto: CreateDeckDto = { name: 'Test Deck' };
      service.create(createDeckDto);

      service.remove(mockUuid);

      expect(service.findAll()).toHaveLength(0);
    });

    it('should throw NotFoundException if deck does not exist', () => {
      expect(() => service.remove('non-existent-id')).toThrow(
        NotFoundException,
      );
    });
  });
}); 
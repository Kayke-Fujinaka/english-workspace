import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCardDto {
  @ApiProperty({
    description: 'Front of the card',
    example: 'Hello',
  })
  @IsNotEmpty()
  @IsString()
  front: string;

  @ApiProperty({
    description: 'Back of the card',
    example: 'Olá',
  })
  @IsNotEmpty()
  @IsString()
  back: string;

  @ApiProperty({
    description: 'The ID of the deck to which the card belongs',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  deckId: string;
}

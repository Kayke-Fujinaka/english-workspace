import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
}

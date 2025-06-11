import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDeckDto {
  @ApiProperty({
    description: 'The name of the deck',
    example: 'English',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

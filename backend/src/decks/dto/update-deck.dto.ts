import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateDeckDto } from './create-deck.dto';

export class UpdateDeckDto extends PartialType(CreateDeckDto) {
  @ApiProperty({
    description: 'The name of the deck',
    example: 'English',
  })
  @IsString()
  @IsOptional()
  name?: string;
}

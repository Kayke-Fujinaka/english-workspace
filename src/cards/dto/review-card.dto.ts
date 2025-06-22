import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ReviewCardDto {
  @ApiProperty({
    description: 'Se o usuário acertou (true) ou errou (false) o card',
    example: true,
  })
  @IsBoolean()
  isCorrect: boolean;
}

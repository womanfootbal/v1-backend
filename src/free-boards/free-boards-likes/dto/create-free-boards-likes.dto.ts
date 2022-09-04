import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateFreeBoardsLikesDto {
  @ApiProperty()
  @IsNumber()
  readonly freeBoardId: number;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;
}

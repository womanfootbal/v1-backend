import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFreeBoardsCommentsDto {
  @ApiProperty()
  @IsNumber()
  readonly freeBoardId: number;

  @ApiProperty()
  @IsNumber()
  readonly userId: number;

  @ApiProperty()
  @IsString()
  readonly contents: string;
}

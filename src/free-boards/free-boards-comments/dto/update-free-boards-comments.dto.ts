import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFreeBoardsCommentsDto {
  @ApiProperty()
  @IsString()
  readonly contents: string;
}

export class UpdateFreeBoardsCommentsParamDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly freeBoardCommentId: number;
}

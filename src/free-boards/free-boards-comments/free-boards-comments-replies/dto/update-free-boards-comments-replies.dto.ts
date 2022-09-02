import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateFreeBoardsCommentsRepliesDto {
  @ApiProperty()
  @IsString()
  readonly contents: string;
}

export class UpdateFreeBoardsCommentsRepliesParamDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly freeBoardCommentReplieId: number;
}

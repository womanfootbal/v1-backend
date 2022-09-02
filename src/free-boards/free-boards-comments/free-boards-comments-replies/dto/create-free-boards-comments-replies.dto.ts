import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateFreeBoardsCommentsRepliesDto {
  @ApiProperty()
  @IsNumber()
  readonly freeBoardCommentId: number;

  @ApiProperty()
  @IsString()
  readonly contents: string;
}

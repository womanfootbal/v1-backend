import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFreeBoardsDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly contents: string;
  // @IsString()
  // @ApiProperty()
  // readonly freeBoardImages: FreeBoardImages[];
}

import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFreeboardsDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly contents: string;

  @IsNumber()
  @ApiProperty()
  readonly userId: number;

  // @IsString()
  // @ApiProperty()
  // readonly freeBoardImages: FreeBoardImages[];
}

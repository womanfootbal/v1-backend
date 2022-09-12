import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateClubNoticesDto {
  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly contents: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly clubId: number;
}

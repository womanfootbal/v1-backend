import { MatchType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';

export class CreateMatchBodyRequestDto {
  @ApiProperty({ default: Date })
  @IsNotEmpty()
  @IsDateString()
  readonly date: Date;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly startTime: number;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly endTime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MatchType)
  readonly type: MatchType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly region: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly personnel: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly clubId: number;
}

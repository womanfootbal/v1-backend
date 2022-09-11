import { MatchType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateMatchBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(12)
  readonly month: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(31)
  readonly day: number;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly startTime: number;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsNumber()
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

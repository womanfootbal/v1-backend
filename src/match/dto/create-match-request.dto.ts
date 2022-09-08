import { MatchStatus, MatchType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateMatchBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly startTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly endTime: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MatchStatus)
  readonly matchStatus: MatchStatus;

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
}

import { ApiProperty } from '@nestjs/swagger';
import { MainEvent, AgeGroup } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateClubBodyRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MainEvent)
  readonly mainEvent: MainEvent;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly activityRegion: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly introduce: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AgeGroup)
  readonly ageGroup: AgeGroup;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';
import { AgeGroup, MainEvent } from '@prisma/client';
import { Type } from 'class-transformer';
import { ClubsEntity } from '@app/prisma/entities';

export class UpdateClubBodyRequestDto {
  @ApiProperty({ enum: [MainEvent] })
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
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly introduce: string;

  @ApiProperty({ enum: [AgeGroup] })
  @IsNotEmpty()
  @IsEnum(AgeGroup)
  readonly ageGroup: AgeGroup;

  @ApiProperty({ nullable: true })
  @ValidateIf((object, value) => value !== null)
  @IsUrl()
  readonly logoImageUrl: string | null;

  toEntity() {
    return ClubsEntity.createOrUpdate(
      this.mainEvent,
      this.activityRegion,
      this.name,
      this.introduce,
      this.ageGroup,
      this.logoImageUrl,
    );
  }
}

export class UpdateClubParamRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly clubId: number;
}

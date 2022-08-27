import { ApiProperty } from '@nestjs/swagger';
import { MainEvent, AgeGroup } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';
import { ClubsEntity } from '@app/prisma/entities';

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
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly introduce: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(AgeGroup)
  readonly ageGroup: AgeGroup;

  @ApiProperty({ nullable: true })
  @ValidateIf((object, value) => value !== null)
  @IsUrl()
  readonly logoImageUrl: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly nickName: string;

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

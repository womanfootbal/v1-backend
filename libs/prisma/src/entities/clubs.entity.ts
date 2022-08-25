import { ApiProperty } from '@nestjs/swagger';
import { Clubs, MainEvent, AgeGroup } from '@prisma/client';

export class ClubsEntity implements Clubs {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty({ enum: MainEvent })
  mainEvent: MainEvent;

  @ApiProperty()
  activityRegion: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  introduce: string;

  @ApiProperty({ enum: AgeGroup })
  ageGroup: AgeGroup;

  @ApiProperty({ nullable: true })
  logoImageUrl: string | null;
}

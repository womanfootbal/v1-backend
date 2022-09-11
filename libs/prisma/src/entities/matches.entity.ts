import { Matches, MatchStatus, MatchType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class MatchesEntity implements Matches {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  year: number;

  @ApiProperty()
  month: number;

  @ApiProperty()
  day: number;

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  endTime: number;

  @ApiProperty()
  matchStatus: MatchStatus;

  @ApiProperty()
  type: MatchType;

  @ApiProperty()
  region: string;

  @ApiProperty()
  personnel: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  clubId: number;
}

import {
  ClubMemberApplications,
  ClubMemberApplicationStatus,
} from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ClubMemberApplicationsEntity implements ClubMemberApplications {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  applicationStatus: ClubMemberApplicationStatus;

  @ApiProperty()
  clubId: number;

  @ApiProperty()
  appliedUserId: number;
}

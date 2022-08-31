import { Injectable } from '@nestjs/common';
import {
  Prisma,
  ClubMemberApplications,
  ClubMemberApplicationStatus,
} from '@prisma/client';

import { PrismaService } from '@app/prisma';

@Injectable()
export class ClubApplicationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    data: Prisma.ClubMemberApplicationsUncheckedCreateInput,
  ): Promise<ClubMemberApplications> {
    return this.prismaService.clubMemberApplications.create({
      data,
    });
  }

  findWaitingApplication(clubId: number, appliedUserId: number) {
    return this.prismaService.clubMemberApplications.findFirst({
      where: {
        clubId,
        appliedUserId,
        applicationStatus: ClubMemberApplicationStatus.WAITING,
        status: true,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma, ClubMemberApplications } from '@prisma/client';

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
}

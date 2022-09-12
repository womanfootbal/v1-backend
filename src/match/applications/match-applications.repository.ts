import { Injectable } from '@nestjs/common';
import { MatchApplications, Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';

@Injectable()
export class MatchApplicationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.MatchApplicationsUncheckedCreateInput) {
    return this.prismaService.matchApplications.create({
      data,
    });
  }

  findByClub(
    clubId: number,
    matchId: number,
  ): Promise<MatchApplications | null> {
    return this.prismaService.matchApplications.findFirst({
      where: {
        clubId,
        matchId,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@app/prisma';

@Injectable()
export class MatchApplicationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.MatchApplicationsUncheckedCreateInput) {
    return this.prismaService.matchApplications.create({
      data,
    });
  }
}

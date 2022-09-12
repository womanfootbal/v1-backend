import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClubNoticesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    clubNoticesUncheckedCreateInput: Prisma.ClubNoticesUncheckedCreateInput,
  ) {
    return this.prisma.clubNotices.create({
      data: clubNoticesUncheckedCreateInput,
    });
  }

  findMany() {
    return this.prisma.clubNotices.findMany();
  }
}

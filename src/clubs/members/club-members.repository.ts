import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@app/prisma';

@Injectable()
export class ClubMembersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMemberOfClub(userId: number, clubId: number) {
    return this.prismaService.clubMembers.findFirst({
      where: {
        userId,
        clubId,
        status: true,
      },
    });
  }

  create(data: Prisma.ClubMembersUncheckedCreateInput) {
    return this.prismaService.clubMembers.create({
      data,
    });
  }
}

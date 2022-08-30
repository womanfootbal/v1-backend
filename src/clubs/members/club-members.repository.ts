import { Injectable } from '@nestjs/common';

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
}

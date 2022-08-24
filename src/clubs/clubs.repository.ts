import { PrismaService } from '@app/prisma';
import { Prisma, Role } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClubsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    clubData: Prisma.ClubsCreateInput,
    { userId, nickName }: { userId: number; nickName: string },
  ) {
    return this.prismaService.$transaction(async (prisma) => {
      const clubs = await prisma.clubs.create({
        data: clubData,
      });
      prisma.clubMembers.create({
        data: {
          clubId: clubs.id,
          userId,
          nickName,
          role: Role.CAPTAIN,
        },
      });

      return clubs;
    });
  }
}

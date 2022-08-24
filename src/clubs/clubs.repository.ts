import { PrismaService } from '@app/prisma';
import { Prisma, Role, Clubs } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IClubsRepository } from './clubs-repository.interface';

@Injectable()
export class ClubsRepository implements IClubsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    clubData: Prisma.ClubsCreateInput,
    { userId, nickName }: { userId: number; nickName: string },
  ): Promise<Clubs> {
    return this.prismaService.$transaction(async (prisma) => {
      const clubs = await prisma.clubs.create({
        data: clubData,
      });
      await prisma.clubMembers.create({
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

  findByUserId(userId: number) {
    return this.prismaService.clubs.findFirst({
      where: {
        clubMembers: {
          some: {
            userId,
            status: true,
          },
        },
      },
    });
  }
}
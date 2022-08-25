import { PrismaService } from '@app/prisma';
import { Prisma, Role, Clubs } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { IFindClubsOptions, TFindByOptions } from './type';

@Injectable()
export class ClubsRepository {
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
        status: true,
        clubMembers: {
          some: {
            userId,
            status: true,
          },
        },
      },
    });
  }

  findManyByOptions({
    page,
    pageSize,
    name,
    activityRegion,
  }: IFindClubsOptions): Promise<TFindByOptions> {
    const where: Prisma.ClubsWhereInput = {
      name,
      activityRegion,
      status: true,
    };

    return this.prismaService.$transaction([
      this.prismaService.clubs.findMany({
        skip: pageSize * (page - 1),
        take: pageSize,
        where,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.clubs.count({
        where,
      }),
    ]);
  }
}

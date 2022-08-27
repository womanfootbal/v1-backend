import { PrismaService } from '@app/prisma';
import { Prisma, Role, Clubs } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import {
  ICreateClubWithMemberParam,
  IFindClubsOptions,
  TFindByOptions,
} from './type';

@Injectable()
export class ClubsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createClubParam: Prisma.ClubsCreateInput,
    { userId, nickName }: ICreateClubWithMemberParam,
  ): Promise<Clubs> {
    return this.prismaService.$transaction(async (prisma) => {
      const clubs = await prisma.clubs.create({
        data: createClubParam,
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

  findById(id: number) {
    return this.prismaService.clubs.findUnique({
      where: {
        id,
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

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';
import { Matches, MatchStatus, Prisma } from '@prisma/client';

import { IFindMatchedOptions } from './type';

@Injectable()
export class MatchRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.MatchesUncheckedCreateInput) {
    return this.prismaService.matches.create({
      data,
    });
  }

  findMatched({
    year,
    month,
    day,
    startTime: newStartTime,
    endTime: newEndTime,
  }: IFindMatchedOptions) {
    return this.prismaService.matches.findFirst({
      where: {
        year,
        month,
        day,
        OR: [
          {
            startTime: {
              lt: newStartTime,
            },
            endTime: {
              gt: newStartTime,
            },
          },
          {
            startTime: {
              lt: newEndTime,
            },
            endTime: {
              gt: newEndTime,
            },
          },
        ],
      },
    });
  }

  findByDate({
    year,
    month,
    day,
  }: {
    year: number;
    month: number;
    day: number;
  }): Promise<Matches[]> {
    return this.prismaService.matches.findMany({
      where: {
        year,
        month,
        day,
        status: true,
        NOT: {
          matchStatus: MatchStatus.CANCELED,
        },
      },
      orderBy: {
        startTime: 'desc',
      },
    });
  }
}

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';
import { Matches, Prisma } from '@prisma/client';

import { IFindMatchedOptions } from './type';

@Injectable()
export class MatchRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.MatchesUncheckedCreateInput) {
    return this.prismaService.matches.create({
      data,
    });
  }

  findMatched({ year, month, day, startTime, endTime }: IFindMatchedOptions) {
    return this.prismaService.matches.findFirst({
      where: {
        year,
        month,
        day,
        startTime: {
          lte: endTime,
          gte: startTime,
        },
      },
    });
  }

  findToday({
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
      },
      orderBy: {
        startTime: 'desc',
      },
    });
  }
}

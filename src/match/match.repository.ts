import { Injectable } from '@nestjs/common';

import { PrismaService } from '@app/prisma';
import { Prisma } from '@prisma/client';
import { IFindMatchedOptions } from './type';

@Injectable()
export class MatchRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.MatchesUncheckedCreateInput) {
    return this.prismaService.matches.create({
      data,
    });
  }

  findMatched({ date, startTime, endTime }: IFindMatchedOptions) {
    return this.prismaService.matches.findFirst({
      where: {
        date,
        startTime: {
          lte: endTime,
          gte: startTime,
        },
      },
    });
  }
}

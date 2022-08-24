import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FreeBoardsCommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    freeBoardCommentsUncheckedCreateInput: Prisma.FreeBoardCommentsUncheckedCreateInput,
  ) {
    return this.prisma.freeBoardComments.create({
      data: freeBoardCommentsUncheckedCreateInput,
    });
  }
}

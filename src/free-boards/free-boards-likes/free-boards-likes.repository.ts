import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FreeBoardsLikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    freeBoardLikesUncheckedCreateInput: Prisma.FreeBoardLikesUncheckedCreateInput,
  ) {
    return this.prisma.freeBoardLikes.create({
      data: freeBoardLikesUncheckedCreateInput,
    });
  }

  findMany() {
    return this.prisma.freeBoardLikes.findMany();
  }
}

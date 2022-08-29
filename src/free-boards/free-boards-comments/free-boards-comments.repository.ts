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

  findMany() {
    return this.prisma.freeBoardComments.findMany();
  }

  findByFreeBoardId(freeBoardId: number) {
    return this.prisma.freeBoardComments.findMany({ where: { freeBoardId } });
  }

  findByFreeBoardCommentId(freeBoardCommentId: number) {
    return this.prisma.freeBoardComments.findUnique({
      where: { id: freeBoardCommentId },
    });
  }

  update(
    freeBoardCommentId: number,
    freeBoardCommentsUpdateInput: Prisma.FreeBoardCommentsUpdateInput,
  ) {
    return this.prisma.freeBoardComments.update({
      where: { id: freeBoardCommentId },
      data: freeBoardCommentsUpdateInput,
    });
  }

  delete(freeBoardCommentId: number) {
    return this.prisma.freeBoardComments.update({
      where: { id: freeBoardCommentId },
      data: { status: false },
    });
  }
}

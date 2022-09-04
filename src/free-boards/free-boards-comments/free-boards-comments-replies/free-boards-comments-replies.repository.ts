import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FreeBoardsCommentsRepliesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    freeBoardCommentRepliesUncheckedCreateInput: Prisma.FreeBoardCommentRepliesUncheckedCreateInput,
  ) {
    return this.prisma.freeBoardCommentReplies.create({
      data: freeBoardCommentRepliesUncheckedCreateInput,
    });
  }

  findByfreeBoardCommentReplieId(freeBoardCommentReplieId: number) {
    return this.prisma.freeBoardCommentReplies.findUnique({
      where: { id: freeBoardCommentReplieId },
    });
  }

  update(
    freeBoardCommentReplieId: number,
    freeBoardCommentRepliesUpdateInput: Prisma.FreeBoardCommentRepliesUpdateInput,
  ) {
    return this.prisma.freeBoardCommentReplies.update({
      where: { id: freeBoardCommentReplieId },
      data: freeBoardCommentRepliesUpdateInput,
    });
  }

  delete(freeBoardCommentReplieId: number) {
    return this.prisma.freeBoardCommentReplies.update({
      where: { id: freeBoardCommentReplieId },
      data: { status: false },
    });
  }
}

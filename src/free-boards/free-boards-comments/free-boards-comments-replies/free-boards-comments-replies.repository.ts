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
}

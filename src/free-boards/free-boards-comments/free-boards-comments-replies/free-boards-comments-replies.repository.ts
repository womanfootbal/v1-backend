import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FreeBoardsCommentsRepliesRepository {
  constructor(private readonly prisma: PrismaService) {}
}

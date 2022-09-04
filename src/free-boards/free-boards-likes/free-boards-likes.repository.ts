import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FreeBoardsLikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.freeBoardLikes.findMany();
  }
}

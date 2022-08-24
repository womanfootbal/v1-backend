import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class FreeBoardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(freeBoardsCreateInput: Prisma.FreeBoardsCreateInput) {
    return this.prisma.freeBoards.create({ data: freeBoardsCreateInput });
  }

  findMany() {
    return this.prisma.freeBoards.findMany();
  }

  findUnique(id: number) {
    return this.prisma.freeBoards.findUnique({ where: { id } });
  }

  update(id: number, freeBoardsUpdateInput: Prisma.FreeBoardsUpdateInput) {
    return this.prisma.freeBoards.update({
      where: { id },
      data: freeBoardsUpdateInput,
    });
  }

  delete(id: number) {
    return this.prisma.freeBoards.update({
      where: { id },
      data: { status: false },
    });
  }
}

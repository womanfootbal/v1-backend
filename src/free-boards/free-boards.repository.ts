import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { CreateFreeBoardsDto } from './dto/create-free-boards.dto';

@Injectable()
export class FreeBoardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createFreeBoardsDto: CreateFreeBoardsDto) {
    return this.prisma.freeBoards.create({ data: createFreeBoardsDto });
  }

  findMany() {
    return this.prisma.freeBoards.findMany();
  }

  findUnique(id: number) {
    return this.prisma.freeBoards.findUnique({ where: { id } });
  }
}

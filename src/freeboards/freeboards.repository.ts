import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { CreateFreeboardsDto } from './dto/create-freeboards.dto';

@Injectable()
export class FreeboardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createFreeboardsDto: CreateFreeboardsDto) {
    return this.prisma.freeBoards.create({ data: createFreeboardsDto });
  }
  
  findMany() {
    return this.prisma.freeBoards.findMany();
  }

  findUnique(id: number) {
    return this.prisma.freeBoards.findUnique({ where: { id } });
  }
}

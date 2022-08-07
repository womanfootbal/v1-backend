import { Injectable } from '@nestjs/common';
import { Prisma, Users } from '@prisma/client';

import { PrismaService } from '@app/prisma';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.UsersCreateInput): Promise<Users> {
    return this.prismaService.users.create({
      data,
    });
  }

  update(userId: number, data: Prisma.UsersUncheckedUpdateInput) {
    return this.prismaService.users.update({
      where: {
        id: userId,
      },
      data,
    });
  }
}

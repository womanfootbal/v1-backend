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
}

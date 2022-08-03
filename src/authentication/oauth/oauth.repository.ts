import { Injectable } from '@nestjs/common';
import { Oauth, Prisma } from '@prisma/client';

import { PrismaService } from '@app/prisma';

@Injectable()
export class OauthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getById(id: string): Promise<Oauth | null> {
    return this.prismaService.oauth.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.OauthUncheckedCreateInput) {
    return this.prismaService.oauth.create({
      data,
    });
  }
}

import { Injectable } from '@nestjs/common';
import { Oauth } from '@prisma/client';

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
}

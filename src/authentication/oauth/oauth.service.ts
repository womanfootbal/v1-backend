import { Injectable } from '@nestjs/common';

import { Gender } from '@prisma/client';
import { OauthRepository } from './oauth.repository';
import { IOauth } from './type';
import { UsersService } from '../../users/users.service';
import { AccessTokenService } from '../token/access-token.service';

@Injectable()
export class OauthService {
  constructor(
    private readonly oauthRepository: OauthRepository,
    private readonly usersService: UsersService,
    private readonly accessTokenService: AccessTokenService,
  ) {}

  getById(id: string) {
    return this.oauthRepository.getById(id);
  }

  async login({ oauth: { id, provider, isMale, userId }, isCreate }: IOauth) {
    if (isCreate) {
      const gender = isMale ? Gender.MALE : Gender.FEMALE;
      const { id: createdUserId } = await this.usersService.create({ gender });
      await this.oauthRepository.create({
        id,
        provider,
        userId: createdUserId,
      });

      return this.accessTokenService.generateAccessToken({
        userId: createdUserId,
      });
    }

    return this.accessTokenService.generateAccessToken({
      userId,
    });
  }
}

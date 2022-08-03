import { Injectable } from '@nestjs/common';

import { IPayload } from '@shared/type';

import { Gender } from '@prisma/client';
import { OauthRepository } from './oauth.repository';
import { IGenerateAccessTokenAndRefreshToken, IOauth } from './type';
import { UsersService } from '../../users/users.service';
import { AccessTokenService } from '../token/access-token.service';
import { RefreshTokenService } from '../token/refresh-token.service';

@Injectable()
export class OauthService {
  constructor(
    private readonly oauthRepository: OauthRepository,
    private readonly usersService: UsersService,
    private readonly accessTokenService: AccessTokenService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  getById(id: string) {
    return this.oauthRepository.getById(id);
  }

  private generateAccessTokenAndRefreshToken({
    userId,
  }: IPayload): IGenerateAccessTokenAndRefreshToken {
    return {
      accessToken: this.accessTokenService.generateAccessToken({ userId }),
      refreshToken: this.refreshTokenService.generateRefreshToken({
        userId,
      }),
    };
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

      return this.generateAccessTokenAndRefreshToken({ userId: createdUserId });
    }

    return this.generateAccessTokenAndRefreshToken({ userId });
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-kakao';
import { OauthProvider } from '@prisma/client';

import { OauthService } from '../oauth.service';
import { IOauth } from '../type';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly configService: ConfigService,
    private readonly oauthService: OauthService,
  ) {
    super({
      clientID: configService.get<string>('KAKAO_REST_API_KEY'),
      callbackURL: 'http://localhost:3000/v1/oauth/kakao/callback',
    });
  }

  async validate(
    _: string,
    __: string,
    profile: Profile,
    done: any,
  ): Promise<void> {
    try {
      const {
        id,
        _json: { kakao_account: kakaoInformation },
      } = profile;

      const oauthId = String(id);
      const oauth = await this.oauthService.getById(oauthId);
      const isMale = kakaoInformation.gender === 'male';

      // NOTE: New User
      if (!oauth) {
        const data: IOauth = {
          oauth: {
            id: oauthId,
            isMale,
            provider: OauthProvider.KAKAO,
          },
          isCreate: true,
        };
        done(null, data);
      }

      // NOTE: Existing User
      const { userId } = oauth;
      const data: IOauth = {
        oauth: {
          id: oauthId,
          isMale,
          provider: OauthProvider.KAKAO,
          userId,
        },
        isCreate: false,
      };

      done(null, data);
    } catch (error) {
      done(error, null);
    }
  }
}

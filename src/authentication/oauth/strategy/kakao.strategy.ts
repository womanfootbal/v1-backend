import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('KAKAO_REST_API_KEY'),
      callbackURL: 'http://127.0.0.1:3000/v1/oauth/kakao/callback',
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
        _json: { kakao_account: kakaoUserInfo },
      } = profile;

      const oauthId = String(id);
    } catch (error) {
      done(error, null);
    }
  }
}

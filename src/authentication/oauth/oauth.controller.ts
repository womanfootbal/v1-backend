import { Req, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  OauthController as Controller,
  KakaoLogin,
  KakaoCallback,
} from './oauth.controller.decorator';
import { IOauth } from './type';
import { OauthService } from './oauth.service';

@Controller()
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @KakaoLogin()
  kakaoLogin() {
    return null;
  }

  @KakaoCallback()
  async kakaoCallback(
    @Req() { user }: { user: IOauth },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.oauthService.login(user);
    res.redirect('http://localhost:3001');
    return null;
  }
}

import { Req, Res } from '@nestjs/common';
import { Response } from 'express';

import {
  OauthController as Controller,
  KakaoLogin,
  KakaoCallback,
} from './oauth.controller.decorator';
import { IOauth } from './type';

@Controller()
export class OauthController {
  @KakaoLogin()
  kakaoLogin() {
    return null;
  }

  @KakaoCallback()
  kakaoCallback(
    @Req() { user }: { user: IOauth },
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(user);
    return null;
  }
}

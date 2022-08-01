import {
  OauthController as Controller,
  KakaoLogin,
} from './oauth.controller.decorator';

@Controller()
export class OauthController {
  @KakaoLogin()
  public kakaoLogin() {
    return null;
  }
}
